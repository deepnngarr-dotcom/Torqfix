import express from 'express';
const router = express.Router();

// Import your controller (Ensure the path and .js extension are correct)
import * as authController from '../controllers/authController.js';

// Define basic routes for your MCA MVP
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router; // This is the line that fixes the crash!