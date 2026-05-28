const express = require('express');

const router = express.Router();

const Inventory = require('../models/Inventory');


// GET INVENTORY
router.get('/', async (req, res) => {

  try {

    const items = await Inventory.find()
      .sort({ createdAt: -1 });

    res.json({ items });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// CREATE UNIT
router.post('/', async (req, res) => {

  try {

    const item = await Inventory.create(
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


// UPDATE UNIT
router.put('/:id', async (req, res) => {

  try {

    const item = await Inventory.findByIdAndUpdate(
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


// DELETE UNIT
router.delete('/:id', async (req, res) => {

  try {

    await Inventory.findByIdAndDelete(
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

