const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const uid = req.params.id;

	try {
		const doc = await db.collection('users').doc(uid).get();
		return res.status(200).json({ status: 'ok', message: 'Successful', data: doc.data() });
	} catch (err) {
		await saveError(err);
	}
};
