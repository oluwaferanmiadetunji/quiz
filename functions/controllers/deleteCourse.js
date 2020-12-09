const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const course = req.body.course;
	const id = req.body.id;
	try {
		await db.collection('courses').doc(id).delete();
		const snapshot = await db.collection('questions').where('category', '==', course).get();
		snapshot.forEach(async (doc) => {
			await db.collection('questions').doc(doc.id).delete();
		});
		return res.status(200).json({ status: 'ok', message: 'Course successfully deleted' });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Error deleting course' });
	}
};
