import db from '../models/index.js';
import redisClient from '../db/redisClient.js';

export const getNearbyTools = async (req, res) => {
  const { lat, lng } = req.query; // Latitude and Longitude from frontend
  const radius = 20000; // 20000 meters = 20km as per SCOPA 

  try {
    // 1. Check Redis Cache first for this coordinate cluster 
    const cacheKey = `search:${lat}:${lng}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));

    // 2. If not in cache, perform PostGIS Spatial Query 
    const tools = await db.Part.findAll({
      where: db.sequelize.where(
        db.sequelize.fn('ST_DWithin', 
          db.sequelize.cast(db.sequelize.col('location'), 'geography'), 
          db.sequelize.cast(db.sequelize.fn('ST_SetSRID', db.sequelize.fn('ST_MakePoint', lng, lat), 4326), 'geography'), 
          radius
        ),
        true
      ),
      include: [{ model: db.User, as: 'owner', attributes: ['name', 'upi_id'] }]
    });

    // 3. Store result in Redis for 5 minutes to ensure <200ms latency 
    await redisClient.setEx(cacheKey, 300, JSON.stringify(tools));

    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
