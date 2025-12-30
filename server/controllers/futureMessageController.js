import FutureMessage from '../models/FutureMessage.js';

export const createFutureMessage = async (req, res) => {
  try {
    const { title, unlockDate, message, icon, color } = req.body;
    
    const futureMessage = await FutureMessage.create({
      title,
      unlockDate,
      message,
      icon,
      color
    });

    res.status(201).json(futureMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllFutureMessages = async (req, res) => {
  try {
    const messages = await FutureMessage.find({ isVisible: true })
      .sort('unlockDate');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getFutureMessageById = async (req, res) => {
  try {
    const message = await FutureMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Future message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateFutureMessage = async (req, res) => {
  try {
    const message = await FutureMessage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Future message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteFutureMessage = async (req, res) => {
  try {
    const message = await FutureMessage.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Future message not found' });
    }

    res.json({ message: 'Future message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const markAsOpened = async (req, res) => {
  try {
    const message = await FutureMessage.findByIdAndUpdate(
      req.params.id,
      { isOpened: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Future message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
