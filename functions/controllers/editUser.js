const { db } = require('../config/firebase');

module.exports = async (req, res) => {
	const count = req.body.count;
	const duration = req.body.duration;
	const name = req.body.name;
	const id = req.user.uid;
	let userData;
	try {
		await db.ref(`/user/${id}`).update({
			count,
			duration,
			name,
		});
		await db.ref(`user/${uid}`).once('value', (snapshot) => {
			userData = snapshot.val();
		});
		const history = userData.history;
		const key = Object.keys(history);
		const value = Object.values(history);

		let array = [];
		for (let i = 0; i < key.length; i++) {
			const data = {
				key: key[i],
				data: value[i],
			};
			array.push(data);
		}

		return res.status(200).json({ status: 'ok', message: 'Account successfully updated', data: { ...userData, history: array } });
	} catch (err) {
		return res.status(500).json({ status: 'error', message: 'Error updating account', data: null });
	}
};
