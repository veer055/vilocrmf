const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

// LOGIN
router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // UPDATE LAST LOGIN
    user.lastLogin = new Date();
    await user.save();

    // RESPONSE
   // CREATE JWT TOKEN
const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '7d'
  }
);

// RESPONSE
res.json({
  success: true,
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    site: user.site
  }
});
  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// GET CURRENT USER
router.get('/me', async (req, res) => {

  res.json({
    success: true,
    user: {
      name: 'Rajesh',
      email: 'owner@propcrm.com',
      role: 'owner'
    }
  });

});

module.exports = router;