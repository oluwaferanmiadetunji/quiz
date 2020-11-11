const { firebase } = require('../config/firebase');
const { SUCCESS, FAILURE } = require('../constants');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const email = req.body.email;
	try {
		await firebase.auth().sendPasswordResetEmail(email);
		return res.status(200).json({ status: SUCCESS, message: 'A link to reset your password has been sent to your email', data: '' });
	} catch (err) {
		await saveError(err);
		return res.status(404).json({ status: FAILURE, message: 'Could not send reset link to the email', data: err });
	}
};
