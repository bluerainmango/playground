//! Reuseable CRUD methods for controllers
const catchAsync = require('./catchAsync');
const CustomError = require('./customError');
const CustomQuery = require('./customQuery');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const queryInstance = new CustomQuery(Model.find(), req.query).filter();

    const queryDocs = await queryInstance.query;

    res.status(200).json({
      status: 'success',
      result: queryDocs.length,
      data: {
        data: queryDocs,
      },
    });
  });
