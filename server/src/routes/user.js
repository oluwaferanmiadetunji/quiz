const express = require('express');
const router = express.Router();
const User = require('../middlewares/User');
const updateUser = require('../controllers/updateUser');
const getDetails = require('../controllers/getDetails');

router.post('/user/update', User, updateUser);
router.get('/user', User, getDetails);

module.exports = router;
