const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/customError');
const crudFactory = require('../utils/crudFactory');

exports.getAllUsers = crudFactory.getAll(User);
exports.getOneUser = crudFactory.getOne(User);
exports.createUser = crudFactory.createOne(User);
exports.deleteUser = crudFactory.deleteOne(User);
exports.updateUser = crudFactory.updateOne(User);
