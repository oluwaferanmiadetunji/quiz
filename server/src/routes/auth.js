const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const loginAdmin = require('../controllers/loginAdmin');
const registerUser = require('../controllers/registerUser');
const registerAdmin = require('../controllers/registerAdmin');
const resetPassword = require('../controllers/resetPassword');

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.post('/admin/login', loginAdmin);
router.post('/admin/register', registerAdmin);
router.post('/reset', resetPassword);

module.exports = router;
