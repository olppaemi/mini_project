const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
});

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
 }    
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: [String]
  },
  image: {
    type: String
  },
  address: {
    type: String
  },
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5
  },
  coords: {
    type: { type: String },
    coordinates: [Number]
  },
  openingTime: {
    type: String
  },
  phone: {
    type: String
  },
  menu: [foodSchema],
  reviews: [reviewSchema]
});

restaurantSchema.index({ coords: '2dsphere' });

mongoose.model('Restaurant', restaurantSchema, 'restaurants');