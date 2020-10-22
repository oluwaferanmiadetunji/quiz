const { db, firebase } = require('../config/firebase');
const validateLoginData = require('../helpers/validateLoginData');
const { NO_USER, WRONG_PASSWORD, SUCCESS, FAILURE, NO_USER_RESPONSE, USER_LOGGED, GENERAL_ERROR } = require('../config/constants');

module.exports = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// validate data
	const validateParams = validateLoginData({ email, password });

	if (validateParams.error) {
		return res.status(417).json({ status: FAILURE, message: validateParams.message, data: '' });
	}

	try {
		const userDoc = db.doc(`/admins/${email}`);
		const user = await userDoc.get();
		if (!user.exists) return res.status(417).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
		const data = await firebase.auth().signInWithEmailAndPassword(email, password);
		const token = await data.user.getIdToken();
		await userDoc.update({
			lastLogin: new Date().toISOString(),
		});
		const userData = (await userDoc.get()).data();
		return res.status(200).json({
			status: SUCCESS,
			message: USER_LOGGED,
			data: { token, details: userData },
		});
	} catch (err) {
		if (err.code === NO_USER) {
			return res.status(417).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
		} else if (err.code === WRONG_PASSWORD) {
			return res.status(417).json({ status: FAILURE, message: NO_USER_RESPONSE, data: '' });
		} else {
			return res.status(417).json({ status: FAILURE, message: GENERAL_ERROR, data: '' });
		}
	}
};
