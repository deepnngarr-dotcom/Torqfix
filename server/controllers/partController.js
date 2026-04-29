import db from '../models/index.js';
import redisClient from '../db/RedisClient.js';

export const createPart = async (req, res) => {
  try {
    const { name, category, selling_price, daily_rate, stock, specs, lat, lng } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: "Location coordinates (lat/lng) are required." });
    }

    const part = await db.Part.create({
      name,
      category,
      selling_price: selling_price || null,
      daily_rate: daily_rate || null,
      stock: stock || 0,
      technical_specs: specs || {}, 
      vendorId: req.user.id, // Correct lowercase mapping
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      }
    });

    await redisClient.del('search:parts:nearby');
    res.status(201).json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNearbyParts = async (req, res) => {
  try {
    const { lat, lng, category } = req.query;

    // 1. FIX: Initialize whereClause so it's defined even when radius is disabled
    const whereClause = {}; 

    /* // TEMPORARILY DISABLED: Radius constraint for global node view
    const radius = 20000; 
    if (lat && lng) {
      whereClause[db.Sequelize.Op.and] = [
        db.sequelize.literal(`
          ST_DWithin(
            location::geography, 
            ST_SetSRID(ST_MakePoint(${parseFloat(lng)}, ${parseFloat(lat)}), 4326)::geography, 
            ${radius}
          )
        `)
      ];
    }
    */

    // 2. Category filtering logic
    if (category && category !== 'ALL') {
      whereClause.category = category.toUpperCase();
    }

    const parts = await db.Part.findAll({
      where: whereClause,
      include: [{ model: db.User, as: 'owner', attributes: ['name', 'role'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(parts);
  } catch (err) {
    // 3. Updated error message to reflect the current state
    console.error("Discovery Error:", err.message);
    res.status(500).json({ error: "Failed to fetch inventory nodes." });
  }
};

export const getAllParts = async (req, res) => {
  try {
    const parts = await db.Part.findAll({
      include: [{ model: db.User, as: 'owner', attributes: ['name'] }]
    });
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPartById = async (req, res) => {
  try {
    const { id } = req.params;
    const part = await db.Part.findByPk(id, {
      include: [{ model: db.User, as: 'owner', attributes: ['name', 'email'] }]
    });

    if (!part) return res.status(404).json({ error: "Node not found." });
    res.json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};