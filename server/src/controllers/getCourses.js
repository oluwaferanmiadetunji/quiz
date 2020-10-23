const { db } = require('../config/firebase');

const { SUCCESS, FAILURE, SUCCESS_MESSAGE, GENERAL_ERROR } = require('../config/constants');
module.exports = async (req, res) => {
	try {
		const data = await db.collection('courses').get();
		if (data.empty) return [];
		let courses = [];
		data.forEach((doc) => {
			courses.push({ ...doc.data, uid: doc.id });
		});
		return res.status(201).json({
			status: SUCCESS,
			message: SUCCESS_MESSAGE,
			data: courses,
		});
	} catch (err) {
		return res.status(500).json({
			status: FAILURE,
			message: GENERAL_ERROR,
			data: err,
		});
	}
};
