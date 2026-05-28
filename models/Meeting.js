
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({

  leadId: String,

  leadName: String,

  type: {
    type: String,
    default: 'Site Visit'
  },

  date: String,

  site: String,

  notes: String,

  createdBy: String

}, {
  timestamps: true
});

module.exports =
  mongoose.model(
    'Meeting',
    meetingSchema
  );

