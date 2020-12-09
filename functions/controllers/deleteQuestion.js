const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	try {
		await db.collection('questions').doc(req.params.id).delete();

		return res.status(200).json({ status: 'ok', message: 'Question successfully deleted' });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Error deleting question' });
	}
};
