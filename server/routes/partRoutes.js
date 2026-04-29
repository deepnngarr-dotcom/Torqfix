// server/routes/partRoutes.js
import express from 'express';
const router = express.Router();
import { createPart, getNearbyParts, getAllParts , getPartById} from '../controllers/partController.js';
import { protect } from '../middleware/authMiddleware.js';

// Matches: POST http://localhost:5005/api/parts
router.post('/', protect, createPart); 

// Matches: GET http://localhost:5005/api/parts/nearby
// 🚩 Ensure the path is exactly '/nearby'
router.get('/nearby', getNearbyParts); 

// Matches: GET http://localhost:5005/api/parts/all
router.get('/all', getAllParts);

router.get('/:id', getPartById);

export default router;