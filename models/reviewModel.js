const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must belong to a user.'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A review must belong to a product.'],
  },
  comment: {
    type: String,
    required: [true, 'A review must have comment.'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
