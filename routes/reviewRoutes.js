const express = require('express');
const ReviewController = require('../controllers/reviewController');

const router = express.Router();

router
  .route('/')
  .get(ReviewController.getAllReviews)
  .post(ReviewController.createReview);

router
  .route('/id')
  .get(ReviewController.getOneReview)
  .delete(ReviewController.deleteReview)
  .patch(ReviewController.updateReview);

module.exports = router;
