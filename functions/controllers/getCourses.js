const {db} = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	try {
		const data = Object.values((await db.ref('courses').once('value')).val());
		return res.status(200).json({status: 'ok', message: '', data});
	} catch (err) {
		await saveError(err);
		return res.status(500).json({status: 'error', message: 'Could not get courses', data: ''});
	}
};
