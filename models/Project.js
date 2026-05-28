
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  site: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: 'Residential'
  },

  status: {
    type: String,
    default: 'Launched'
  },

  totalUnits: {
    type: Number,
    default: 0
  },

  sold: {
    type: Number,
    default: 0
  },

  progress: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  'Project',
  ProjectSchema
);

