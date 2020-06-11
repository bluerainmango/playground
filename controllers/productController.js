const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/customError');
const crudFactory = require('../utils/crudFactory');

exports.getAllProducts = crudFactory.getAll(Product);
