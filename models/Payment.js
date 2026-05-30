const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
{
  leadId: {
    type: String,
    default: ''
  },

  leadName: {
    type: String,
    default: ''
  },

  site: {
    type: String,
    default: ''
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    default: 'Token'
  },

  status: {
    type: String,
    default: 'Pending'
  },

  date: {
    type: String,
    default: () => new Date().toISOString()
  },

  notes: {
    type: String,
    default: ''
  },

  createdBy: {
    type: String,
    default: ''
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  'Payment',
  paymentSchema
);