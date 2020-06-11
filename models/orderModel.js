const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  item: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Order must belong to a product(s).'],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  price: {
    type: Number,
    required: [true, 'Order must have a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate('item').populate({
    path: 'user',
    select: 'name',
  });
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
