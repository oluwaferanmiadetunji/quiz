const { db, firebase } = require('../config/firebase');
const validateUserData = require('../helpers/validateUserData');
const { USER_EXISTS, USER_EXISTS_RESPONSE, SUCCESS, FAILURE, USER_CREATED } = require('../constants');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;

	// validate data
	const validateParams = validateUserData({ email, password, name });

	if (validateParams.error) {
		return res.status(417).json({ status: FAILURE, message: validateParams.message });
	}
	let token, userId;
	try {
		const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
		userId = data.user.uid;
		token = await data.user.getIdToken();
		await db.collection('users').doc(userId).set({
			email,
			name,
			activated: false,
			createdAt: new Date().toISOString(),
			lastLogin: new Date().toISOString(),
			count: 10,
			duration: 30,
			total: 0,
			correct: 0,
			times: 0,
			userId,
		});
		return res.status(200).json({ status: SUCCESS, message: USER_CREATED });
	} catch (err) {
		saveError(err);
		if (err.code === USER_EXISTS) {
			return res.status(500).json({ status: FAILURE, message: USER_EXISTS_RESPONSE });
		}
	}
};
