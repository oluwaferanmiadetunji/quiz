const { db } = require('../config/firebase');
const { SUCCESS, FAILURE, UPDATED } = require('../config/constants');

module.exports = async (req, res) => {
	const count = req.body.count;
	const duration = req.body.duration;
	const name = req.body.name;
	const id = req.user.uid;
	try {
		await db.doc(`/users/${req.user.email}`).update({
			name,
			count,
			duration,
		});
		return res.status(201).json({
			status: SUCCESS,
			message: UPDATED,
			data: '',
		});
	} catch (err) {
		return res.status(500).json({
			status: FAILURE,
			message: GENERAL_ERROR,
			data: err,
		});
	}
};
