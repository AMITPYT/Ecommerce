const express = require('express');

const auth  = require('../middleware/auth');
const { registerUser, loginUser, getUserProfile } = require('../modules/user/user.controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile);

module.exports = router;
