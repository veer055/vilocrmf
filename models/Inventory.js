
const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({

  site: {
    type: String,
    default: ''
  },

  project: {
    type: String,
    default: ''
  },

  floor: {
    type: Number,
    default: 0
  },

  unit: {
    type: Number,
    default: 0
  },

  bhk: {
    type: String,
    default: ''
  },

  area: {
    type: Number,
    default: 0
  },

  price: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: 'Available'
  },

  buyer: {
    type: String,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  'Inventory',
  InventorySchema
);

