
const express = require('express');

const router = express.Router();

const Project = require('../models/Project');


// GET PROJECTS
router.get('/', async (req, res) => {

  try {

    const items = await Project.find()
      .sort({ createdAt: -1 });

    res.json({ items });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// CREATE PROJECT
router.post('/', async (req, res) => {

  try {

    const project = await Project.create(req.body);

    res.json(project);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// UPDATE PROJECT
router.put('/:id', async (req, res) => {

  try {

    const item = await Project.findByIdAndUpdate(
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


// DELETE PROJECT
router.delete('/:id', async (req, res) => {

  try {

    await Project.findByIdAndDelete(
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

