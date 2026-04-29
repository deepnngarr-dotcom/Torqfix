import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
import routes from './routes/index.js';

dotenv.config();
const app = express();

// 🚀 DYNAMIC CORS: Accepts local dev or the production frontend URL
const allowedOrigins = [
  'http://localhost:3000', 
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL // Add this in Render/Vercel settings later
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
  try {
    await db.sequelize.authenticate();
    console.log('PostgreSQL Connected...');
    
    // ⚠️ 'alter: true' is fine for your MCA MVP, but be careful with production data
    await db.sequelize.sync({ alter: true });
    console.log('Database synchronized');

    // Render/Vercel will provide the PORT automatically
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
};

startServer();