const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['web-dev', 'mobile-dev', 'data-science', 'devops', 'design', 'other']
  },
  difficulty: {
    type: String,
    required: [true, 'Le niveau de difficulté est requis'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  instructorId: {
    type: String,  // ID Clerk
    required: [true, 'L\'ID de l\'instructeur est requis']
  },
  instructorName: String,
  thumbnail: String,
  duration: Number,  // en minutes
  published: {
    type: Boolean,
    default: false
  },
  tags: [String],
  enrollments: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
CourseSchema.virtual('chaptersCount', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'course',
  count: true
});

module.exports = mongoose.model('Course', CourseSchema);