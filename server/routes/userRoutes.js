import express from 'express';
import { getUserDashboard } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Matches: GET http://localhost:5005/api/user/dashboard
router.get('/dashboard', protect, getUserDashboard);

export default router;