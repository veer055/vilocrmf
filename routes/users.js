
const express = require('express');

const router = express.Router();

const User = require('../models/User');


// GET USERS
router.get('/', async (req, res) => {

  try {

    const items = await User.find()
      .sort({ createdAt: -1 });

    res.json({ items });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// CREATE USER
router.post('/', async (req, res) => {

  try {

    const user = await User.create(
      req.body
    );

    res.json(user);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// UPDATE USER
router.put('/:id', async (req, res) => {

  try {

    const item = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(item);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// DELETE USER
router.delete('/:id', async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});

module.exports = router;

