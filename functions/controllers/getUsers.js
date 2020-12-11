const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	try {
		let users = [];
		const snapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
		snapshot.forEach((doc) => {
			users.push({ ...doc.data(), id: doc.id });
		});
		return res.status(200).json({ status: 'ok', message: '', data: users });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get users', data: '' });
	}
};
