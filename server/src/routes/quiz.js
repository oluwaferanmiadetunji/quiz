const express = require('express');
const router = express.Router();
const User = require('../middlewares/User');
const Admin = require('../middlewares/Admin');
const setQuiz = require('../controllers/setQuiz');
const addQuestion = require('../controllers/addQuestion');

router.post('/quiz', User, setQuiz);
router.post('/questions', Admin, addQuestion);

module.exports = router;
