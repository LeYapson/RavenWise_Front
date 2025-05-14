const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'La question est requise']
  },
  options: {
    type: [String],
    required: [true, 'Les options sont requises'],
    validate: {
      validator: function(v) {
        return v.length >= 2;
      },
      message: 'Au moins deux options sont requises'
    }
  },
  correctAnswer: {
    type: Number,
    required: [true, 'La réponse correcte est requise']
  },
  explanation: String
});

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis']
  },
  description: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  },
  questions: [QuestionSchema],
  timeLimit: Number, // en secondes
  passingScore: {
    type: Number,
    default: 70
  },
  xpReward: {
    type: Number,
    default: 20
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', QuizSchema);