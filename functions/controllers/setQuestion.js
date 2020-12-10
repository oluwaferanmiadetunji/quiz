const { db } = require('../config/firebase');
const shuffle = require('../helpers/shuffle');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const count = req.user.count;
	const category = req.body.category;
	const activated = req.user.activated;

	try {
		let questions = [];
		let snapshot;
		if (activated) {
			snapshot = await db.collection('questions').where('category', '==', category).get();
		} else {
			snapshot = await db.collection('questions').where('type', '==', 'Free').where('category', '==', category).get();
		}
		snapshot.forEach((doc) => {
			questions.push({ ...doc.data(), id: doc.id });
		});
		const data = await shuffle(questions).slice(0, count);

		return res.status(200).json({ status: 'ok', message: 'Questions set', data });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get questions' });
	}
};
