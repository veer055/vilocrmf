
const express = require('express');

const router = express.Router();

const Payment = require('../models/Payment');


// GET PAYMENTS
router.get('/', async (req, res) => {

  try {

    const items = await Payment.find()
      .sort({ createdAt: -1 });

    res.json({ items });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// CREATE PAYMENT
router.post('/', async (req, res) => {

  try {

    const item = await Payment.create(
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


// UPDATE PAYMENT
router.put('/:id', async (req, res) => {

  try {

    const item = await Payment.findByIdAndUpdate(
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


// DELETE PAYMENT
router.delete('/:id', async (req, res) => {

  try {

    await Payment.findByIdAndDelete(
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

