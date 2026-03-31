const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['plumbing', 'electrical', 'cleaning', 'hvac', 'carpentry', 'painting', 'landscaping']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  price: {
    type: String,
    required: [true, 'Please add price range']
  },
  priceMin: Number,
  priceMax: Number,
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [String],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);