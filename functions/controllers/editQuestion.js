const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const question = req.body.question;
	const correctAnswer = req.body.correctAnswer;
	const incorrectAnswers = req.body.incorrectAnswers;
	const type = req.body.type;
	const category = req.body.category;

	try {
		await db.collection('questions').doc(req.params.id).update({
			question,
			correctAnswer,
			incorrectAnswers,
			type,
			category,
		});
		return res.status(200).json({ status: 'ok', message: 'Question updated successfully' });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Something went wrong!' });
	}
};
