//! import/delete seed data
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Review = require('../models/reviewModel');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PWD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`🐶 Successfully connected to DB`);
  })
  .catch((err) => {
    console.log(`ERR occured during importing/deleting dev-data to DB: ${err}`);
  });

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, `products.json`), 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, `users.json`), 'utf-8')
);
// const orders = JSON.parse(
//   fs.readFileSync(path.join(__dirname, `orders.json`), 'utf-8')
// );
// const reviews = JSON.parse(
//   fs.readFileSync(path.join(__dirname, `reviews.json`), 'utf-8')
// );

const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    // await Order.create(orders);
    console.log('💚 Successfully imported!');
  } catch (err) {
    throw new Error('📍 Error during importing data.');
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    // await Order.deleteMany();
    console.log('💚 Successfully deleted!');
  } catch (err) {
    throw new Error('📍 Error during deleting data.');
  }
  process.exit();
};

const option = process.argv[2];

if (option === '--import') {
  importData();
} else if (option === '--delete') {
  deleteData();
}
