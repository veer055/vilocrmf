
const express = require('express');

const router = express.Router();

const Meeting = require('../models/Meeting');


// GET MEETINGS
router.get('/', async (req, res) => {

  try {

    const items = await Meeting.find()
      .sort({ createdAt: -1 });

    res.json({ items });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// CREATE MEETING
router.post('/', async (req, res) => {

  try {

    const item = await Meeting.create(
      req.body
    );

    res.json(item);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// UPDATE MEETING
router.put('/:id', async (req, res) => {

  try {

    const item = await Meeting.findByIdAndUpdate(
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


// DELETE MEETING
router.delete('/:id', async (req, res) => {

  try {

    await Meeting.findByIdAndDelete(
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

