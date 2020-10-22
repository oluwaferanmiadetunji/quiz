const { db, firebase } = require('../config/firebase');
const validateUserData = require('../helpers/validateUserData');
const { USER_EXISTS, USER_EXISTS_RESPONSE, SUCCESS, FAILURE, USER_CREATED } = require('../config/constants');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const name = req.body.name.trim();
	const password = req.body.password.trim();

	// validate data
	const validateParams = validateUserData({ email, password, name });

	if (validateParams.error) return res.status(417).json({ status: FAILURE, message: validateParams.message, data: '' });

	let token, userId;
	try {
		const userDoc = db.doc(`/users/${email}`);
		const user = await userDoc.get();
		if (user.exists) return res.status(417).json({ status: FAILURE, message: USER_EXISTS_RESPONSE, data: '' });

		const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
		userId = data.user.uid;
		token = await data.user.getIdToken();

		await userDoc.set({
			email,
			name,
			status: 'Free',
			createdAt: new Date().toISOString(),
			lastLogin: new Date().toISOString(),
			count: 50,
			duration: 30,
			total: 0,
			correct: 0,
			times: 0,
			userId,
		});
		return res.status(201).json({
			status: SUCCESS,
			message: USER_CREATED,
			data: '',
		});
	} catch (err) {
		console.log(err);
		if (err.code === USER_EXISTS) {
			return res.status(400).json({
				status: FAILURE,
				message: USER_EXISTS_RESPONSE,
				data: '',
			});
		} else {
			return res.status(500).json({
				status: FAILURE,
				message: GENERAL_ERROR,
				data: '',
			});
		}
	}
};
