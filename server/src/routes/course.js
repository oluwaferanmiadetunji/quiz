const express = require('express');
const router = express.Router();
const Admin = require('../middlewares/Admin');
const getCourses = require('../controllers/getCourses');
const addCourses = require('../controllers/addCourses');

router.get('/courses', getCourses);
router.post('/courses', Admin, addCourses);

module.exports = router;
