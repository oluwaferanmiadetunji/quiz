const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
	const question = req.body.question;
	const correctAnswer = req.body.correctAnswer;
	const incorrectAnswers = req.body.incorrectAnswers;
	const type = req.body.type;
	const category = req.body.category;
	const key = uuidv4();

	try {
		const data = {
			createdAt: new Date().toISOString(),
			question,
			correctAnswer,
			incorrectAnswers,
			type,
			category,
		};
		await db.ref(`questions/${key}`).set(data);
		return res.status(200).json({ status: 'ok', message: 'Course added successfully', data: { key, data } });
	} catch (err) {
		return res.status(500).json({ status: 'error', message: 'Something went wrong!', data: '' });
	}
};
