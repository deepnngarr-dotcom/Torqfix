import express from 'express';
const router = express.Router();
import db from '../models/index.js'; 

router.get('/logs', async (req, res) => {
  try {
    const logs = await db.Booking.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        { model: db.User, as: 'user' }, 
        { model: db.Part, as: 'tool' } // 👈 UPDATED: Points to Unified Part model
      ]
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;