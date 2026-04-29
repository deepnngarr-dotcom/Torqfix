import express from 'express';
import db from '../models/index.js';
import { analyzeToolDamage } from '../services/aiDamageService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route 1: Initiate Transaction (Purchase or Rent)
router.post('/initiate', protect, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const renterId = req.user.id; 
    
    // 👈 UPDATED: Changed SharedTool to Part
    const tool = await db.Part.findOne({
      where: { id: req.body.toolId },
      lock: true, 
      transaction: t
    });
    
    if (!tool) throw new Error("Asset not found in registry.");

    // Update state to REQUESTED for the handover workflow
    await tool.update({ status: 'REQUESTED' }, { transaction: t });
    
    await t.commit();
    res.json({ message: 'UPI Funds Locked. Proceed to Visual Audit.' });
  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
});

// Route 2: Process Return (Triggers AI SSIM comparison)
router.post('/return', async (req, res) => {
  const { toolId, returnImageData } = req.body;
  try {
    // 👈 UPDATED: Changed SharedTool to Part
    const tool = await db.Part.findByPk(toolId);
    const baselineImage = tool.condition_data.pre_rental_image;

    const audit = await analyzeToolDamage(baselineImage, returnImageData);

    if (audit.isDamaged) {
      await tool.update({ 
        status: 'RETURNED', 
        condition_data: {...tool.condition_data, audit_flag: 'DAMAGED', score: audit.score } 
      });
      res.json({ message: 'Damage detected. UPI funds held for review.', score: audit.score });
    } else {
      await tool.update({ status: 'AVAILABLE' });
      res.json({ message: 'Return successful. UPI funds released.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;