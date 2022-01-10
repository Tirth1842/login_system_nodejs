const express = require('express');
const router = express.Router();



const userController = require('../controller/usersController');
// login page
router.get('/login', userController.login_render);

// Register page
router.get('/Register', userController.register_render);

// Register handel
router.post('/register', userController.register_user);

// login Handle
router.post('/login', userController.login_user);

// Logout Handle
router.get('/logout', userController.logout_user);


module.exports = router;