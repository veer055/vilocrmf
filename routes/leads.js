const express = require('express');
const router = express.Router();


const Lead = require('../models/Lead');
const { protect } = require('../middleware/auth');
// STEP 3 → ADD LEAD
router.post('/', protect, async (req, res) => {

  try {

   const lead = await Lead.create({
  ...req.body,
  createdBy: req.user.id,
  
  history: [
    {
      action: 'Lead created'
    }
  ]
});

    res.json({
      success: true,
      lead
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});



// CREATE LEAD
// router.post('/', async (req, res) => {

//   try {

//     const lead = new Lead(req.body);

//     await lead.save();

//     res.json({
//       success: true,
//       lead
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });

//   }

// });
// STEP 4 → GET LEADS
router.get('/', protect, async (req, res) => {

  try {

    const leads = await Lead.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items: leads
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

router.delete('/:id', protect, async (req, res) => {

  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      success: true
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


router.put('/:id', protect, async (req, res) => {

  try {

    const oldLead = await Lead.findById(req.params.id);

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if(!lead.history){
      lead.history = [];
    }

 if(oldLead.status !== req.body.status){

  lead.history.unshift({
    action: `Status changed: ${oldLead.status} → ${req.body.status}`,
    createdAt: new Date()
  });

  if(req.body.status === 'Converted'){
    lead.convertedAt = new Date();
  }

}
    lead.history.unshift({
      action: 'Lead updated',
      createdAt: new Date()
    });

    await lead.save();

    res.json({
      success: true,
      lead
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});
router.post('/:id/notes', protect, async (req, res) => {

  try {

    const lead = await Lead.findById(req.params.id);
    lead.history.unshift({
  action: 'Note added'
});

    lead.notes.unshift({
      text: req.body.text
    });

    await lead.save();

    res.json({
      success: true,
      lead
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


router.post('/:id/tasks', protect, async (req, res) => {

  try {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found'
      });
    }

    if (!lead.tasks) {
      lead.tasks = [];
    }

    lead.history.unshift({
  action: 'Task added'
});
    lead.tasks.unshift({
      desc: req.body.desc,
      due: req.body.due,
      type: req.body.type,
      priority: req.body.priority,
      done: false
    });

    await lead.save();

    const updatedLead = await Lead.findById(req.params.id);

    res.json({
      success: true,
      lead: updatedLead
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;
