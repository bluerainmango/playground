//! Reuseable CRUD methods for controllers
const catchAsync = require('./catchAsync');
const CustomError = require('./customError');
const CustomQuery = require('./customQuery');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const queryInstance = new CustomQuery(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const queryDocs = await queryInstance.query;

    res.status(200).json({
      status: 'success',
      result: queryDocs.length,
      data: {
        data: queryDocs,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new CustomError('No document found with that id.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new CustomError(' No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new CustomError(' No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  });
