import express from 'express';
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword,
  createEmployee 
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Employee Creation Route
router.post('/create-employee', createEmployee);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected Profile Route
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

export default router;