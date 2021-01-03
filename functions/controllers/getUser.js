const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const uid = req.params.id;

	try {
		let history = [];
		const doc = await db.collection('users').doc(uid).orderBy('createdAt', 'desc').get();
		const snapshot = await db.collection('history').where('userId', '==', uid).orderBy('createdAt', 'desc').get();
		snapshot.forEach((doc) => {
			history.push({ ...doc.data(), id: doc.id });
		});
		res.status(200).json({ status: 'ok', message: 'Successful', data: { ...doc.data(), history } });
	} catch (err) {
		await saveError(err);
	}
};
