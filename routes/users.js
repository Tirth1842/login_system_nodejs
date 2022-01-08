const express = require('express');
const router = express.Router();

// login page
router.get('/login', (req,res) => res.render('login'));

// Register page
router.get('/Register', (req,res) => res.render('register'));

module.exports = router;