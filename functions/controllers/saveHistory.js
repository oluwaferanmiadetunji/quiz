const { db } = require('../config/firebase');

module.exports = async (req, res) => {
	const userId = req.user.uid;
	const data = req.body.data;

	try {
		const user = db.collection('users').doc(userId);
		const { total, correct, times } = (await user.get()).data();

		await user.collection('history').add({
			createdAt: new Date().toISOString(),
			data,
		});
		await user.update({
			total: total + data.total,
			correct: correct + data.correct,
			times: times + 1,
		});
		return res.status(200).json({ status: 'ok', message: 'Successful' });
	} catch (err) {
		return res.status(500).json({ status: 'error', message: 'Unsuccessful' });
	}
};
