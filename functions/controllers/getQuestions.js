const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	try {
		const data = (await db.ref('questions').once('value')).val();
		const key = Object.keys(data);
		const value = Object.values(data);
		let array = [];
		for (let i = 0; i < key.length; i++) {
			const data = {
				key: key[i],
				data: value[i],
			};
			array.push(data);
		}
		return res.status(200).json({ status: 'ok', message: 'Successful', data: array });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get questions', data: [] });
	}
};
