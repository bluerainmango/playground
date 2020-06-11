const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/customError');
const crudFactory = require('../utils/crudFactory');

exports.getAllProducts = crudFactory.getAll(Product);
exports.getOneProduct = crudFactory.getOne(Product);
exports.createProduct = crudFactory.createOne(Product);
exports.deleteProduct = crudFactory.deleteOne(Product);
exports.updateProduct = crudFactory.updateOne(Product);
