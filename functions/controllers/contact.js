const { db } = require('../config/firebase');
const { SUCCESS, FAILURE } = require('../constants');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const email = req.body.email;
	const content = req.body.content;

	try {
		await db.collection('message').add({
			createdAt: new Date().toISOString(),
			email,
			content,
			read: false,
		});
		res.status(201).json({ status: SUCCESS, message: 'Your message has been sent. You will be attented to via email', data: '' });
	} catch (err) {
		saveError(err);
		res.status(417).json({ status: FAILURE, message: 'Error sending message', data: '' });
	}
};
