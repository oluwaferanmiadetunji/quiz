const { db } = require('../config/firebase');

module.exports = async (req, res) => {
	let users;
	try {
		await db.ref('user').once('value', (snapshot) => {
			users = snapshot.val();
		});

		const key = Object.keys(users);
		const value = Object.values(users);

		let array = [];
		for (let i = 0; i < key.length; i++) {
			const data = {
				key: key[i],
				data: {
					correct: value[i].correct,
					count: value[i].count,
					createdAt: value[i].createdAt,
					duration: value[i].duration,
					email: value[i].email,
					lastLogin: value[i].lastLogin,
					name: value[i].name,
					status: value[i].status,
					times: value[i].times,
					total: value[i].total,
				},
			};
			array.push(data);
		}
		return res.status(200).json({ status: 'ok', message: '', data: array });
	} catch (err) {
		return res.status(500).json({ status: 'error', message: 'Could not get users', data: '' });
	}
};
