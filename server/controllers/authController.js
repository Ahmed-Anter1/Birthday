import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, isActive: true });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCredentials = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findById(req.user._id);
    if (username) user.username = username;
    if (password) user.password = password;
    await user.save();
    res.json({ message: 'Credentials updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleFriendMode = async (req, res) => {
  try {
    const { userId, enable } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = enable ? 'friend' : 'viewer';
    await user.save();
    res.json({ message: `Friend mode ${enable ? 'enabled' : 'disabled'}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};