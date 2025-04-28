const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  date_time: {
    type: Date,
    required: [true, 'Date and time are required'],
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service type is required'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);