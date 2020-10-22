const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const registerUser = require('../controllers/registerUser');
const registerAdmin = require('../controllers/registerAdmin');

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.post('/admin/register', registerAdmin);

module.exports = router;
