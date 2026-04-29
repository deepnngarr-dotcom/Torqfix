import express from 'express';
// 🚀 ADDED: acceptBooking to the import list
import { 
  getVendorDashboard, 
  addInventoryItem, 
  updateStock, 
  acceptBooking 
} from '../controllers/vendorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Matches: GET http://localhost:5005/api/vendor/dashboard
router.get('/dashboard', protect, getVendorDashboard);

// Matches: POST http://localhost:5005/api/vendor/inventory
router.post('/inventory', protect, addInventoryItem);

// Matches: PUT http://localhost:5005/api/vendor/stock/:id
router.put('/stock/:id', protect, updateStock);

// 🚀 NEW: Activation Route for Handover
// Matches the frontend call: /api/vendor/bookings/${bookingId}/accept
router.patch('/bookings/:bookingId/accept', protect, acceptBooking);

export default router;