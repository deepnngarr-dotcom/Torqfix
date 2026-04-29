import db from '../models/index.js';
import { compareToolConditions } from '../services/aiDamageService.js';

export const processReturn = async (req, res) => {
  const { toolId, returnImageData } = req.body;

  try {
    const tool = await db.Part.findByPk(toolId);
    const preRentalImage = tool.condition_data.pre_rental_image;

    // 1. Run AI Damage Detection
    const audit = await compareToolConditions(preRentalImage, returnImageData);

    if (audit.isDamaged) {
      // 2. Damage Detected: Capture UPI Blocked Funds
      // status -> DISPUTED for admin review [1]
      await tool.update({ 
        status: 'RETURNED',
        condition_data: {...tool.condition_data, return_score: audit.score, audit_flag: 'DAMAGED' }
      });
      return res.json({ 
        message: 'Damage detected by AI. UPI Funds captured for repair.',
        score: audit.score 
      });
    } else {
      // 3. Asset Safe: Release UPI Block
      await tool.update({ 
        status: 'AVAILABLE',
        condition_data: {...tool.condition_data, return_score: audit.score, audit_flag: 'CLEAN' }
      });
      res.json({ message: 'Return successful! UPI funds released to renter.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};