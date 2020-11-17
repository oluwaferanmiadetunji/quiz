const { admin, db, firebase } = require('../config/firebase');
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

	let token, uid, userData;
	try {
		const data = await firebase.auth().signInWithEmailAndPassword(email, password);
		uid = data.user.uid;
		token = await data.user.getIdToken();

		const snapshot = await db.ref(`user/${uid}`).once('value');
		userData = snapshot.val();
		if (userData) {
			const history = userData.history;
			const key = Object.keys(history);
			const value = Object.values(history);

			let array = [];
			for (let i = 0; i < key.length; i++) {
				const data = {
					key: key[i],
					data: value[i],
				};
				array.push(data);
			}
			await db.ref(`user/${uid}`).update({
				...userData,
				lastLogin: new Date().toISOString(),
			});
			return res.status(200).json({
				status: SUCCESS,
				message: USER_LOGGED,
				data: { token, user: { uid, ...userData, history: array } },
			});
		} else {
			return res.status(404).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
		}
	} catch (err) {
		await saveError(err);
		if (err.code === NO_USER) {
			return res.status(417).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
		} else if (err.code === WRONG_PASSWORD) {
			return res.status(417).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
		} else {
			return res.status(500).json({ status: FAILURE, message: GENERAL_ERROR, data: '' });
		}
	}
};
