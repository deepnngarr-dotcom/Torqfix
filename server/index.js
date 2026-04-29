import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
import routes from './routes/index.js';

dotenv.config();
const app = express();

// 🚀 DYNAMIC CORS: Optimized for production handshakes
const allowedOrigins = [
  'http://localhost:3000', 
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Consolidated Routing
app.use('/api', routes);

const startServer = async () => {
  // 1. Define PORT immediately for Render's health check
  const PORT = process.env.PORT || 5005;

  try {
    // 2. Attempt Database Handshake
    await db.sequelize.authenticate();
    console.log('PostgreSQL Connected...');
    
    await db.sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (err) {
    // 🚀 If DB fails, we log it but still start the server to avoid Port errors
    console.error('Database connection failed:', err.message);
  }

  // 3. Bind to Port 0.0.0.0 (Required for Render)
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();