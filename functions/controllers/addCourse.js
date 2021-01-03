const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const course = req.body.course;
	const collection = db.collection('courses');
	try {
		const existing = await collection.where('course', '==', course).orderBy('createdAt', 'desc').get();
		if (!existing.empty) {
			return res.status(409).json({ status: 'error', message: 'Course exists already' });
		} else {
			const { id } = await collection.add({
				createdAt: new Date().toISOString(),
				course,
			});
			return res.status(200).json({ status: 'ok', message: 'Course added successfully', data: { course, id } });
		}
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Something went wrong!', data: '' });
	}
};
