const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	try {
		let courses = [];
		const snapshot = await db.collection('courses').orderBy('createdAt').get();
		snapshot.forEach((doc) => {
			courses.push({ ...doc.data(), id: doc.id });
		});
		return res.status(200).json({ status: 'ok', message: '', data: courses });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get courses', data: [] });
	}
};
