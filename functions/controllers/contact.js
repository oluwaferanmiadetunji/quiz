const { admin, db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const { SUCCESS, FAILURE } = require('../constants');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const email = req.body.email;
	const content = req.body.content;

	db.ref(`message/${uuidv4()}`)
		.set({
			createdAt: admin.database.ServerValue.TIMESTAMP,
			email,
			content,
			read: false,
		})
		.then(() => {
			res.status(201).json({ status: SUCCESS, message: 'Your message has been sent. You will be attented to via email', data: '' });
		})
		.catch(() => {
			saveError(err);
			res.status(417).json({ status: FAILURE, message: 'Error sending message', data: '' });
		});
};
