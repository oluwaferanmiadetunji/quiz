const { db } = require('../config/firebase');
const { SUCCESS, FAILURE, SUCCESS_MESSAGE } = require('../config/constants');

module.exports = async (req, res) => {
	const category = req.body.category.trim();
	const correctAnswer = req.body.correctAnswer.trim();
	const incorrectAnswers = JSON.stringify(req.body.incorrectAnswers).trim();
	const question = req.body.question.trim();
	const type = req.body.type.trim();

	try {
		await db.collection('questions').add({ category, correctAnswer, incorrectAnswers, question, type, createdAt: new Date().toISOString() });
		return res.status(201).json({
			status: SUCCESS,
			message: SUCCESS_MESSAGE,
			data: '',
		});
	} catch (err) {
		return res.status(500).json({
			status: FAILURE,
			message: GENERAL_ERROR,
			data: err,
		});
	}
};
