const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true 
  },
  password_hash: { 
    type: String, 
    required: [true, 'Password is required'] 
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);