const Order = require('../models/OrderModel');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/customError');
const crudFactory = require('../utils/crudFactory');

exports.getAllOrders = crudFactory.getAll(Order);
exports.getOneOrder = crudFactory.getOne(Order);
exports.createOrder = crudFactory.createOne(Order);
exports.deleteOrder = crudFactory.deleteOne(Order);
exports.updateOrder = crudFactory.updateOne(Order);
