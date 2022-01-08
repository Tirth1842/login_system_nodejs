const express = require('express');
const router = express.Router();

// login page
router.get('/login', (req,res) => res.send('Login'));

// Register page
router.get('/Register', (req,res) => res.send('Register'));

module.exports = router;