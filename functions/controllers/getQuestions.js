const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	try {
		let questions = [];
		const snapshot = await db.collection('questions').orderBy('createdAt', 'desc').get();
		snapshot.forEach((doc) => {
			questions.push({ ...doc.data(), id: doc.id });
		});

		return res.status(200).json({ status: 'ok', message: 'Successful', data: questions });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get questions', data: [] });
	}
};
