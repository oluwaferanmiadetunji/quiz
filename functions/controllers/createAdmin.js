const { admin, db, firebase } = require('../config/firebase');
const validateAdminData = require('../helpers/validateAdminData');
const { USER_EXISTS, USER_EXISTS_RESPONSE, SUCCESS, FAILURE, USER_CREATED } = require('../constants');

module.exports = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// validate data
	const validateParams = validateAdminData({ email, password });

	if (validateParams.error) {
		return res.status(417).json({ status: FAILURE, message: validateParams.message, data: '' });
	}
	const data = {
		email,
		createdAt: new Date().toISOString(),
	};
	let key = '';
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((authUser) => {
			key = authUser.user.uid;
			return db.ref(`admin/${authUser.user.uid}`).set(data);
		})
		.then(() => {
			return res.status(200).json({ status: SUCCESS, message: USER_CREATED, data: { key, data } });
		})
		.catch((err) => {
			if (err.code === USER_EXISTS) {
				return res.status(500).json({ status: FAILURE, message: USER_EXISTS_RESPONSE, data: '' });
			}
		});
};
