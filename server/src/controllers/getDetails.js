const { db } = require('../config/firebase');
const { SUCCESS, FAILURE, SUCCESS_MESSAGE, GENERAL_ERROR } = require('../config/constants');

module.exports = async (req, res) => {
	const email = req.user.email;
	try {
		const data = await (await db.doc(`/users/${email}`).get()).data();
		return res.status(201).json({
			status: SUCCESS,
			message: SUCCESS_MESSAGE,
			data,
		});
	} catch (err) {
		return res.status(500).json({
			status: FAILURE,
			message: GENERAL_ERROR,
			data: err,
		});
	}
};
