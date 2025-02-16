const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register or login a user
router.post('/login', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, points: user.points });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user points
router.get('/:phoneNumber', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.params.phoneNumber });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, points: user.points });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;