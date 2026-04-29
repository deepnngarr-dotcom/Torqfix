import db from '../models/index.js';

export const initiateTransaction = async (req, res) => {
  try {
    const { toolId, type, duration } = req.body; 
    const userId = req.user.id;
    const userRole = req.user.role; // 🚀 Extracted from the 'protect' middleware

    // 🛡️ RBAC Guard: Only Startups/Users can buy or rent
    if (userRole !== 'user') {
      return res.status(403).json({ 
        error: "Access Denied: Only startup accounts can initiate node acquisitions." 
      });
    }

    // 1. Fetch from Unified Part table
    const part = await db.Part.findByPk(toolId);
    if (!part) return res.status(404).json({ error: "Asset not found" });

    // 2. Calculate based on Rent vs Buy
    let totalPrice = 0;
    if (type === 'PURCHASE') {
      totalPrice = part.selling_price;
    } else {
      totalPrice = part.daily_rate * (duration || 1);
    }

    // 3. Create Booking with correct Foreign Key
    const booking = await db.Booking.create({
      type,
      userId,
      toolId: toolId, // 🚀 FIXED: Matches the 'toolId' key in Booking.js
      total_price: totalPrice,
      status: 'PENDING',
      start_date: type === 'RENTAL' ? new Date() : null,
      end_date: type === 'RENTAL' ? new Date(Date.now() + (duration || 1) * 24 * 60 * 60 * 1000) : null
    });

    res.status(201).json({ message: `${type} initiated!`, booking });
  } catch (err) {
    console.error("Transaction Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

{/*import db from '../models/index.js';

export const initiateTransaction = async (req, res) => {
  try {
    const { toolId, type, duration } = req.body; 
    const userId = req.user.id;

    // 1. Fetch from Unified Part table
    const part = await db.Part.findByPk(toolId);
    if (!part) return res.status(404).json({ error: "Asset not found" });

    // 2. Calculate based on Rent vs Buy
    let totalPrice = 0;
    if (type === 'PURCHASE') {
      totalPrice = part.selling_price;
    } else {
      totalPrice = part.daily_rate * (duration || 1);
    }

    const booking = await db.Booking.create({
      type,
      userId,
      partId: toolId, // Ensure your Booking model's FK matches this
      total_price: totalPrice,
      status: 'PENDING',
      start_date: type === 'RENTAL' ? new Date() : null,
      end_date: type === 'RENTAL' ? new Date(Date.now() + (duration || 1) * 24 * 60 * 60 * 1000) : null
    });

    res.status(201).json({ message: `${type} initiated!`, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/}