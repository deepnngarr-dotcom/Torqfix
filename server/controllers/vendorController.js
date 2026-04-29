import db from '../models/index.js';
import redisClient from '../db/RedisClient.js';

// 1. Broadcast new asset to the Noida Network
export const addInventoryItem = async (req, res) => {
  const { name, category, price, stock, specs, location } = req.body;
  try {
    const part = await db.Part.create({
      name,
      category,
      selling_price: price, 
      stock,
      technical_specs: specs,
      location: { 
        type: 'Point', 
        coordinates: [parseFloat(location.lng), parseFloat(location.lat)] 
      },
      vendorId: req.user.id // 🚀 Ensures Ownership
    });

    await redisClient.del('search:parts:nearby');
    res.status(201).json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Optimized Vendor Dashboard Query
export const getVendorDashboard = async (req, res) => {
  try {
    const vendorId = req.user.id;

    // Fetch all assets broadcasted by this vendor account
    const myAssets = await db.Part.findAll({
      where: { vendorId: vendorId },
      include: [{ model: db.User, as: 'owner', attributes: ['name'] }]
    });

    // Fetch all incoming rental/purchase requests for this vendor's tools
    const myBookings = await db.Booking.findAll({
      include: [
        { 
          model: db.Part, 
          as: 'tool', 
          where: { vendorId: vendorId }, // 🚀 Filters for THIS vendor's tools
          required: true // Forces an inner join so we only see relevant bookings
        },
        { model: db.User, as: 'user', attributes: ['name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      myAssets,
      myBookings,
      stats: {
        totalAssets: myAssets.length,
        pendingApprovals: myBookings.filter(b => b.status === 'PENDING').length, // 🚀 NEW
        activeRentals: myBookings.filter(b => b.status === 'ACTIVE').length      // 🚀 NEW
      }
    });
  } catch (err) {
    console.error("Vendor Dashboard Sync Error:", err.message); 
    res.status(500).json({ error: "Failed to sync vendor node data." });
  }
};

// 3. 🚀 NEW: Accept Logic to Activate the Node
export const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const vendorId = req.user.id;

    // Validate ownership before allowing activation
    const booking = await db.Booking.findOne({
      where: { id: bookingId },
      include: [{ 
        model: db.Part, 
        as: 'tool', 
        where: { vendorId: vendorId } 
      }]
    });

    if (!booking) return res.status(404).json({ error: "Booking not found or unauthorized." });

    // Transition status from PENDING to ACTIVE
    booking.status = 'ACTIVE';
    await booking.save();

    res.json({ message: "Subscription activated successfully!", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Instant Stock Calibration
export const updateStock = async (req, res) => {
  try {
    await db.Part.update(
      { stock: req.body.newStock },
      { where: { id: req.params.id, vendorId: req.user.id } }
    );
    res.json({ message: 'Stock updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};