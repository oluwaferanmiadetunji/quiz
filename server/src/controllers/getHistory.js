const { db } = require('../config/firebase');
const { SUCCESS, FAILURE, GENERAL_ERROR, SUCCESS_MESSAGE } = require('../config/constants');

module.exports = async (req, res) => {
	const email = req.user.email;
	try {
		const userDoc = db.collection('users').doc(email).collection('history');
		const data = await userDoc.get();
		if (data.empty)
			return res.status(201).json({
				status: SUCCESS,
				message: SUCCESS_MESSAGE,
				data: [],
			});
		let history = [];
		data.forEach((doc) => {
			history.push(doc.data());
		});
		return res.status(201).json({
			status: SUCCESS,
			message: SUCCESS_MESSAGE,
			data: history,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: FAILURE,
			message: GENERAL_ERROR,
			data: err,
		});
	}
};
