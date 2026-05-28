
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

  leadId: String,

  customer: String,

  project: String,

  unit: String,

  amount: Number,

  type: String,

  status: {
    type: String,
    default: 'Pending'
  },

  paidOn: String,

  notes: String,

  createdBy: String

}, {
  timestamps: true
});

module.exports =
  mongoose.model(
    'Payment',
    paymentSchema
  );

