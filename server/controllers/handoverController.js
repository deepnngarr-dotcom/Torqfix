import db from '../models/index.js';
import redisClient from '../db/RedisClient.js';

export const processHandover = async (req, res) => {
  const { toolId, renterId, imageData } = req.body; // imageData is base64 from camera

  const t = await db.sequelize.transaction();
  try {
    const tool = await db.Part.findByPk(toolId, { lock: true, transaction: t });

    if (tool.status!== 'REQUESTED') {
      throw new Error('Tool must be in REQUESTED state to begin handover.');
    }

    // 1. UPI Reserve Pay Verification (Simulation)
    // Max block ₹10,000 for 90 days as per NPCI guidelines
    const blockVerified = true; 

    if (blockVerified) {
      // 2. Log Pre-Rental Condition in JSONB [1]
      // In production, save imageData to S3 and store the URL here
      await tool.update({
        status: 'ACTIVE',
        condition_data: {
         ...tool.condition_data,
          pre_rental_timestamp: new Date(),
          pre_rental_image: imageData.substring(0, 50) + "..." // Placeholder for image ref
        }
      }, { transaction: t });

      // 3. Clear Redis Search Cache for this tool's proximity
      await redisClient.del(`search:tools:nearby`); 

      await t.commit();
      res.json({ message: 'Handover complete. Rental is now ACTIVE.', tool });
    }
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};