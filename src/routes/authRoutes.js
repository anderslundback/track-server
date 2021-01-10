const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

// called each time someone makes a POST request to /signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();
    res.send('You made a POST request');
});

module.exports = router;