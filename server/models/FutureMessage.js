import mongoose from 'mongoose';

const futureMessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  unlockDate: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    enum: ['heart', 'gift', 'star', 'calendar'],
    default: 'heart'
  },
  color: {
    type: String,
    default: 'from-red-500 to-pink-500'
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isOpened: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('FutureMessage', futureMessageSchema);
