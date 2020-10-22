const { db, firebase } = require('../config/firebase');
const validateAdminData = require('../helpers/validateAdminData');
const { USER_EXISTS, USER_EXISTS_RESPONSE, SUCCESS, FAILURE, USER_CREATED } = require('../config/constants');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password.trim();

	// validate data
	const validateParams = validateAdminData({ email, password });

	if (validateParams.error) return res.status(417).json({ status: FAILURE, message: validateParams.message, data: '' });

	let token, userId;
	try {
		const user = await db.doc(`/admins/${email}`).get();
		if (user.exists) return res.status(417).json({ status: FAILURE, message: USER_EXISTS_RESPONSE, data: '' });

		const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
		userId = data.user.uid;
		token = await data.user.getIdToken();

		await db.doc(`/admins/${email}`).set({
			email,
			createdAt: new Date().toISOString(),
			lastLogin: new Date().toISOString(),
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
