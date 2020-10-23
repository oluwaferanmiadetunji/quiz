const express = require('express');
const router = express.Router();
const User = require('../middlewares/User');
const updateUser = require('../controllers/updateUser');

router.post('/user/update', User, updateUser);

module.exports = router;
