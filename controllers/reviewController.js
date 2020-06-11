const Review = require('../models/ReviewModel');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/customError');
const crudFactory = require('../utils/crudFactory');

exports.getAllReviews = crudFactory.getAll(Review);
exports.getOneReview = crudFactory.getOne(Review);
exports.createReview = crudFactory.createOne(Review);
exports.deleteReview = crudFactory.deleteOne(Review);
exports.updateReview = crudFactory.updateOne(Review);
