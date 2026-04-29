import express from 'express';
import { initiateTransaction } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// This maps to: POST http://localhost:5005/api/bookings/initiate
router.post('/initiate', protect, initiateTransaction);

export default router;