const { db } = require('../config/firebase');
const { SUCCESS, FAILURE, SUCCESS_MESSAGE } = require('../config/constants');

module.exports = async (req, res) => {
	const course = req.body.course.trim();
	if (course === '')
		return res.status(417).json({
			status: FAILURE,
			message: 'Course can not be empty',
			data: '',
		});
	try {
		await db.collection('courses').add({ course, createdAt: new Date().toISOString() });
		return res.status(201).json({
			status: SUCCESS,
			message: SUCCESS_MESSAGE,
			data: '',
		});
	} catch (err) {
		return res.status(500).json({
			status: FAILURE,
			message: GENERAL_ERROR,
			data: err,
		});
	}
};
