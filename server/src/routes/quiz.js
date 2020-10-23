const express = require('express');
const router = express.Router();
const User = require('../middlewares/User');
const setQuiz = require('../controllers/setQuiz');
const getCourses = require('../controllers/getCourses');

router.post('/quiz', User, setQuiz);
router.get('/courses', getCourses);

module.exports = router;
