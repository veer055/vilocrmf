const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({

  leadId: String,

  leadName: String,

  desc: String,

  type: {
    type: String,
    default: 'Follow-up'
  },

  priority: {
    type: String,
    default: 'Normal'
  },

  due: String,

  done: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  'Reminder',
  ReminderSchema
);