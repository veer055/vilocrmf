
const express = require('express');

const router = express.Router();

const Site = require('../models/Site');


// GET ALL SITES
router.get('/', async (req, res) => {

  try {

    const items = await Site.find()
      .sort({ createdAt: -1 });

    res.json({ items });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// CREATE SITE
router.post('/', async (req, res) => {

  try {

    const site = await Site.create({

      name: req.body.name,

      city: req.body.city,

      project: req.body.project

    });

    res.json(site);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error'
    });

  }

});


// DELETE SITE
router.delete('/:id', async (req, res) => {

  try {

    await Site.findByIdAndDelete(
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

