const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
	const course = req.body.course;

	try {
		const data = {
			createdAt: new Date().toISOString(),
			course,
		};
		await db.ref(`courses/${uuidv4()}`).set(data);
		return res.status(200).json({ status: 'ok', message: 'Course added successfully', data });
	} catch (err) {
		return res.status(500).json({ status: 'error', message: 'Something went wrong!', data: '' });
	}
};
