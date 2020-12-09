const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const uid = req.user.uid;
	try {
		const doc = await db.collection('users').doc(uid).get();
		res.status(200).json({ status: 'ok', message: 'Successful', data: doc.data() });
	} catch (err) {
		await saveError(err);
	}
};
