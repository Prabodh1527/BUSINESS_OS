import express from 'express';
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword 
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected Profile Route
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

export default router;
