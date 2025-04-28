const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../config/auth');

// Register a new user
const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate role
    const validRoles = ['customer', 'admin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = new User({ 
      username, 
      password_hash: hashedPassword, 
      role: role || 'customer' 
    });
    await user.save();

    // Generate and return JWT token
    const token = generateToken(user);
    res.status(201).json({ 
      message: 'User registered successfully', 
      token, 
      user: { username, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate and return JWT token
    const token = generateToken(user);
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { username: user.username, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    // Validate req.user from middleware
    if (!req.user || !req.user.id) {
      console.error('Invalid user data in token:', req.user);
      return res.status(400).json({ message: 'Invalid user data in token' });
    }

    console.log('Fetching profile for user ID:', req.user.id); // Debug log

    // Fetch user from database, excluding password_hash
    const user = await User.findById(req.user.id).select('-password_hash');
    if (!user) {
      console.warn('User not found for ID:', req.user.id); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'Profile retrieved successfully', 
      user 
    });
  } catch (error) {
    console.error('Profile retrieval error:', error); // Detailed error logging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login, getProfile };