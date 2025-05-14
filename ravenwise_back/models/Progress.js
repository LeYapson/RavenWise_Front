const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: String,  // ID Clerk
    required: [true, 'L\'ID utilisateur est requis']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'L\'ID du cours est requis']
  },
  completedChapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  }],
  currentChapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  },
  quizResults: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: Number,
    maxScore: Number,
    completedAt: Date
  }],
  xpEarned: {
    type: Number,
    default: 0
  },
  completedAt: Date,
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', ProgressSchema);