
const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  city: {
    type: String,
    default: ''
  },

  project: {
    type: String,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  'Site',
  SiteSchema
);

