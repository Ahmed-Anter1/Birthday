import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const user = await User.findOne({ username: 'admin' });

console.log('Stored password:', user.password);
console.log('Password match:', await user.comparePassword('admin123'));

process.exit();
