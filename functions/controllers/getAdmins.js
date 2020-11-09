const { db } = require('../config/firebase');

module.exports = async (req, res) => {
	let admins;
	try {
		await db.ref('admin').once('value', (snapshot) => {
			admins = snapshot.val();
		});

		const key = Object.keys(admins);
		const value = Object.values(admins);

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
		return res.status(500).json({ status: 'error', message: 'Could not get admins', data: '' });
	}
};
