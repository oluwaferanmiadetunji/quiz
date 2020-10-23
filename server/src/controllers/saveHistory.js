const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const { SUCCESS, FAILURE, SAVED, GENERAL_ERROR } = require('../config/constants');

module.exports = async (req, res) => {
	const email = req.user.email;
	const data = req.body.data;

	try {
		const userDoc = db.collection('users').doc(email);
		await userDoc
			.collection('history')
			.doc(uuidv4())
			.set({
				createdAt: new Date().toISOString(),
				...data,
			});
		await userDoc.update({
			total: data.total + 1,
			correct: data.correct + 1,
			times: req.user.times + 1,
		});
		return res.status(201).json({
			status: SUCCESS,
			message: SAVED,
			data: '',
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: FAILURE,
			message: GENERAL_ERROR,
			data: err,
		});
	}
};
