const {db} = require('../config/firebase');
const shuffle = require('../helpers/shuffle');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const count = parseInt(req.body.count);
	const category = req.body.category;
	const status = req.body.status;
	try {
		const Data = Object.values((await db.ref('questions').orderByChild('category').equalTo(category).once('value')).val());
		let questions = [];
		if (status === 'Free') {
			questions = shuffle(Data.filter((question) => question.type === 'Free')).slice(0, count);
		} else {
			questions = shuffle(Data.slice(0, count));
		}
		return res.status(200).json({status: 'ok', message: 'Questions set', data: questions});
	} catch (err) {
		await saveError(err);
		return res.status(500).json({status: 'error', message: 'Could not get questions', data: ''});
	}
};
