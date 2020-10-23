const { db } = require('../config/firebase');
const shuffle = require('../helpers/shuffle');
const { SUCCESS, FAILURE, FREE } = require('../config/constants');

module.exports = async (req, res) => {
	const count = req.user.count;
	const category = req.body.category;
	const status = req.user.status;

	try {
		const Data = await db.collection('questions').where('category', '==', category).get();
		let questions = [];
		if (status === FREE) {
			questions = shuffle(Data.filter((question) => question.type === FREE)).slice(0, count);
		} else {
			questions = shuffle(Data.slice(0, count));
		}
		return res.status(200).json({ status: SUCCESS, message: 'Questions set', data: questions });
	} catch (err) {
		return res.status(500).json({ status: FAILURE, message: 'Error getting questions', data: err });
	}
};
