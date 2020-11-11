const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const course = req.body.course;
	const key = uuidv4();

	try {
		const data = {
			createdAt: new Date().toISOString(),
			course,
		};
		await db.ref(`courses/${key}`).set(data);
		return res.status(200).json({ status: 'ok', message: 'Course added successfully', data: { key, data } });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Something went wrong!', data: '' });
	}
};
