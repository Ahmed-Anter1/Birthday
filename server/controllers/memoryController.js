import Memory from '../models/Memory.js';
import cloudinary from '../config/cloudinary.js';


export const createMemory = async (req, res) => {
  try {
    const { title, reactionText, year, tone } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // رفع الصورة على Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'birthday-website/memories',
          resource_type: 'image'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const memory = await Memory.create({
      title,
      reactionText,
      year,
      tone,
      image: uploadResult.secure_url // 👈 أهم سطر
    });

    res.status(201).json(memory);
  } catch (error) {
    console.error('Create memory error:', error);
    res.status(500).json({ message: 'Create memory failed' });
  }
};



export const getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ isVisible: true })
      .sort('year')
      .sort('order');
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMemoryById = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }
    res.json(memory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.json(memory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);
    
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};