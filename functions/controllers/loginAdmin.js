const { db, firebase } = require('../config/firebase');
const validateLoginData = require('../helpers/validateLoginData');
const { NO_USER, WRONG_PASSWORD, SUCCESS, FAILURE, NO_USER_RESPONSE, USER_LOGGED, GENERAL_ERROR } = require('../constants');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// validate data
	const validateParams = validateLoginData({ email, password });

	if (validateParams.error) {
		return res.status(417).json({ status: FAILURE, message: validateParams.message, data: '' });
	}

	let token, uid;
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((data) => {
			uid = data.user.uid;
			return data.user.getIdToken();
		})
		.then((IdToken) => {
			token = IdToken;
			return db.ref(`admin/${uid}`).once('value', (snapshot) => {
				userData = snapshot.val();
			});
		})
		.then(() => {
			return !!userData
				? res.status(200).json({ status: SUCCESS, message: USER_LOGGED, data: token })
				: res.status(417).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
		})
		.catch((err) => {
			saveError(err);
			if (err.code === NO_USER) {
				return res.status(500).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
			} else if (err.code === WRONG_PASSWORD) {
				return res.status(500).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
			} else {
				return res.status(500).json({ status: FAILURE, message: GENERAL_ERROR, data: '' });
			}
		});
};
