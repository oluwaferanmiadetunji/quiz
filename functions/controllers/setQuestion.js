const { db } = require('../config/firebase');
const shuffle = require('../helpers/shuffle');
const saveError = require('./saveError');
const _ = require('lodash');

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
			questions.push({
				correctAnswer: doc.data().correctAnswer,
				answers: _.shuffle([...doc.data().incorrectAnswers, doc.data().correctAnswer]),
				question: doc.data().question,
				id: doc.id,
				selectedAnswer: null,
				isCorrect: null,
			});
		});
		const data = await shuffle(questions).slice(0, count + 1);

		return res.status(200).json({ status: 'ok', message: 'Questions set', data });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get questions' });
	}
};
