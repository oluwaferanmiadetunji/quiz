const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const question = req.body.question;
	const correctAnswer = req.body.correctAnswer;
	const incorrectAnswers = req.body.incorrectAnswers;
	const type = req.body.type;
	const category = req.body.category;
	const key = req.params.id;

	try {
		const data = {
			question,
			correctAnswer,
			incorrectAnswers,
			type,
			category,
		};
		await db.ref(`questions/${key}`).update(data);
		return res.status(200).json({ status: 'ok', message: 'Question updated successfully', data: null });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Something went wrong!', data: '' });
	}
};
