const express = require('express');

const router = express.Router();

// called each time someone makes a POST request to /signup
router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send('You made a POST request');
});

module.exports = router;