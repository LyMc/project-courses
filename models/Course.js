const mongoose = require('mongoose');

const Course = mongoose.model('Course', {
  title: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  image: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

module.exports = Course;
