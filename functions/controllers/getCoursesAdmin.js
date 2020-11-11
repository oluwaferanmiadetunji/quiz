const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	let courses;
	try {
		await db.ref('courses').once('value', (snapshot) => {
			courses = snapshot.val();
		});

		const key = Object.keys(courses);
		const value = Object.values(courses);

		let array = [];
		for (let i = 0; i < key.length; i++) {
			const data = {
				key: key[i],
				data: value[i],
			};
			array.push(data);
		}

		return res.status(200).json({ status: 'ok', message: '', data: array });
	} catch (err) {
		await saveError(err);
		return res.status(500).json({ status: 'error', message: 'Could not get questions', data: '' });
	}
};
