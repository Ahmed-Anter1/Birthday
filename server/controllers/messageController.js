import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { text, author, isSurprise } = req.body;
    const message = await Message.create({
      text,
      author: author || 'Anonymous',
      isSurprise: isSurprise || false
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ isVisible: true }).sort('-createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ message: 'Not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};