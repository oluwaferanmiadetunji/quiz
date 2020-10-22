const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const registerUser = require('../controllers/registerUser');

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);

module.exports = router;
