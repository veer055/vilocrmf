const express = require('express');

const router = express.Router();

const Reminder = require('../models/Reminder');

const { protect } = require('../middleware/auth');


// GET REMINDERS
router.get('/', protect, async (req, res) => {

  try {

    const reminders = await Reminder.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items: reminders
    });

  } catch(err){

    res.status(500).json({
      message: err.message
    });

  }

});


// CREATE REMINDER
router.post('/', protect, async (req, res) => {

  try {

    const reminder = await Reminder.create({

      ...req.body,

      createdBy: req.user.id

    });

    res.json({
      success: true,
      reminder
    });

  } catch(err){

    res.status(500).json({
      message: err.message
    });

  }

});


// MARK DONE
router.put('/:id', protect, async (req, res) => {

  try {

    const reminder = await Reminder.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    res.json({
      success: true,
      reminder
    });

  } catch(err){

    res.status(500).json({
      message: err.message
    });

  }

});


// DELETE
router.delete('/:id', protect, async (req, res) => {

  try {

    await Reminder.findByIdAndDelete(req.params.id);

    res.json({
      success: true
    });

  } catch(err){

    res.status(500).json({
      message: err.message
    });

  }

});


module.exports = router;