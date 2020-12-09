const { db, firebase } = require('../config/firebase');
const validateAdminData = require('../helpers/validateAdminData');
const { USER_EXISTS, USER_EXISTS_RESPONSE, SUCCESS, FAILURE, USER_CREATED } = require('../constants');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// validate data
	const validateParams = validateAdminData({ email, password });

	if (validateParams.error) {
		return res.status(417).json({ status: FAILURE, message: validateParams.message });
	}
	const user = {
		email,
		createdAt: new Date().toISOString(),
	};

	try {
		const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
		userId = data.user.uid;
		await db.collection('admins').doc(userId).set(user);
		return res.status(200).json({ status: SUCCESS, message: USER_CREATED, data: { userId, ...user } });
	} catch (err) {
		saveError(err);
		if (err.code === USER_EXISTS) {
			return res.status(500).json({ status: FAILURE, message: USER_EXISTS_RESPONSE });
		}
	}
};
