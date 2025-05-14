const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'video', 'image', 'quiz'],
    required: true
  },
  title: String,
  text: String,
  videoUrl: String,
  imageUrl: String,
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
}, { _id: false });

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis']
  },
  description: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Le cours associé est requis']
  },
  order: {
    type: Number,
    required: [true, 'L\'ordre du chapitre est requis']
  },
  duration: Number,  // en minutes
  content: [ContentSchema],
  xpValue: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Chapter', ChapterSchema);