const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	try {
		let admins = [];
		const snapshot = await db.collection('admins').orderBy('createdAt').get();
		snapshot.forEach((doc) => {
			admins.push({ ...doc.data(), id: doc.id });
		});

		return res.status(200).json({ status: 'ok', message: '', data: admins });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get admins', data: admins });
	}
};
