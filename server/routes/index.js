import express from 'express';
const router = express.Router();

import authRoutes from './authRoutes.js';
import partRoutes from './partRoutes.js';
import userRoutes from './userRoutes.js';     
import vendorRoutes from './vendorRoutes.js'; 
import bookingRoutes from './bookingRoutes.js';
import activityRoutes from './activityRoutes.js';

router.use('/activity', activityRoutes); // Access via /api/activity
router.use('/auth', authRoutes);
router.use('/parts', partRoutes);
router.use('/user', userRoutes);     // Access via /api/user
router.use('/vendor', vendorRoutes); // Access via /api/vendor
router.use('/bookings', bookingRoutes); // Access via /api/bookings

export default router;