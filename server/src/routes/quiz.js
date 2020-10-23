const express = require('express');
const router = express.Router();
const User = require('../middlewares/User');
const setQuiz = require('../controllers/setQuiz');

router.post('/quiz', User, setQuiz);

module.exports = router;
