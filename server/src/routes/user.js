const express = require('express');
const router = express.Router();
const User = require('../middlewares/User');
const updateUser = require('../controllers/updateUser');
const getDetails = require('../controllers/getDetails');
const saveHistory = require('../controllers/saveHistory');
const getHistory = require('../controllers/getHistory');

router.post('/user/update', User, updateUser);
router.get('/user', User, getDetails);
router.get('/user/history', User, getHistory);
router.post('/user/history/save', User, saveHistory);

module.exports = router;
