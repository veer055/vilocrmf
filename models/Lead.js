const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  source: {
    type: String,
    default: 'Website'
  },

  status: {
    type: String,
    default: 'New'
  },

  budget: {
    type: Number,
    default: 0
  },

  site: {
    type: String,
    default: 'All Sites'
  },

  assignedTo: {
  type: String,
  default: ''
},


tasks: [
  {
    desc: String,

    due: String,

    type: String,

    priority: String,

    done: {
      type: Boolean,
      default: false
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
],

history: [
  {
    action: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
],
notes: [
  {
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
],
convertedAt: {
  type: Date,
  default: null
},

dealValue: {
  type: Number,
  default: 0
},

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Lead', LeadSchema);