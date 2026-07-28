import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'node:dns';

// Force Node.js to use Google & Cloudflare DNS for SRV lookup
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Initialize dotenv
dotenv.config();

// Import database connection AFTER setting up DNS and dotenv
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});