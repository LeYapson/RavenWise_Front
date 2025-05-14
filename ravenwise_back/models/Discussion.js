const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userImage: String,
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DiscussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userImage: String,
  category: {
    type: String,
    enum: ['general', 'help', 'feedback', 'course-specific'],
    default: 'general'
  },
  tags: [String],
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [String],
  replies: [ReplySchema],
  isResolved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Discussion', DiscussionSchema);