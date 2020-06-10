const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A product name must have less or equal then 40 characters',
      ],
      minlength: [
        2,
        'A product name must have more or equal then 2 characters',
      ],
    },
    slug: String,
    level: {
      type: String,
      required: [true, 'A product must have a level'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'level is either: easy, medium, difficult ',
      },
    },
    duration: {
      type: Number,
      required: [true, 'A product must have a duration'],
    },
    ratingsAverage: {
      type: Number,
      default: 5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // make *.*
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A product must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A product must have a cover image'],
    },
    images: [String],
    createdAt: { type: Date, default: Date.now(), select: false },
    developers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    secretProduct: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//! Generate virtual variable: durationWeeks
productSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//! Generate slug for URL
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//! Find docs that are not a secret product
productSchema.pre(/^find/, function (next) {
  this.find({ secretProduct: { $ne: true } });
  next();
});

//! Populate embeded doc(developer)
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'developer',
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
