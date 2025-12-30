import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
      default: null,
    required: true
  },
  reactionText: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    enum: ['funny', 'emotional', 'nostalgic'],
    default: 'nostalgic'
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Memory', memorySchema);
