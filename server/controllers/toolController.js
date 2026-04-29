import db from '../models/index.js';

export const addTool = async (req, res) => {
  try {
    const { name, category, daily_rate, selling_price, description, lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Location coordinates are required." });
    }

    const newTool = await db.Part.create({
      name,
      category,
      daily_rate: daily_rate || null, 
      selling_price: selling_price || null,
      description,
      vendorId: req.user.id, // Fixed: Changed from VendorId to vendorId
      status: 'AVAILABLE',
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      }
    });

    res.status(201).json(newTool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};