import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import mediaRoutes from './routes/media.js';
import messageRoutes from './routes/messages.js';
import memoryRoutes from './routes/memories.js';
import futureMessageRoutes from './routes/futureMessages.js';

dotenv.config();
const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = await User.create({
      username: 'admin',
      password: 'admin123',  // غيرها بعدين من الموقع
      role: 'admin'
    });

    console.log('✅ Admin created:', admin.username);
  } catch (error) {
    console.error('Error:', error);
  }
};

createAdmin();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://birthday-sagt-i2dj0gxx4-ahmed-anters-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // مهم للـ Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.options('*', cors()); // مهم جدًا

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/future-messages', futureMessageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});