const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);