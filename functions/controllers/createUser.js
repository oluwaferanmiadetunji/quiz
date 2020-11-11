const { admin, db, firebase } = require('../config/firebase');
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
		return res.status(417).json({ status: FAILURE, message: validateParams.message, data: '' });
	}
	let token, userId;
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			return db.ref(`user/${userId}`).set({
				email,
				name,
				status: 'Free',
				createdAt: admin.database.ServerValue.TIMESTAMP,
				lastLogin: admin.database.ServerValue.TIMESTAMP,
				count: 20,
				duration: 30,
				total: 0,
				correct: 0,
				times: 0,
			});
		})
		.then(() => {
			return res.status(200).json({ status: SUCCESS, message: USER_CREATED, data: { name, email, userToken: token } });
		})
		.catch((err) => {
			saveError(err);
			if (err.code === USER_EXISTS) {
				return res.status(500).json({ status: FAILURE, message: USER_EXISTS_RESPONSE, data: '' });
			}
		});
};
