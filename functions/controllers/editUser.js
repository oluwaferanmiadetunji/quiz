const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const count = req.body.count;
	const duration = req.body.duration;
	const name = req.body.name;
	const id = req.user.uid;

	try {
		await db.collection('users').doc(id).update({
			count,
			duration,
			name,
		});

		return res.status(200).json({ status: 'ok', message: 'Account successfully updated' });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Error updating account' });
	}
};
