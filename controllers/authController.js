const User = require('../models/User');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendVerificationEmail = require('../services/cloudinaryService.js'); // Підключаємо сервіс

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.register = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password, isVerified: false });
    await newUser.save();

    // Надсилаємо верифікаційний email
    await sendVerificationEmail(email, newUser._id);

    res.status(201).json({ message: 'User created successfully. Please verify your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
