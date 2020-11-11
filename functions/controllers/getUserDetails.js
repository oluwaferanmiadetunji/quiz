const { db } = require('../config/firebase');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const uid = req.user.uid;
	try {
		let userData;
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
		res.status(200).json({ status: 'ok', message: 'Successful', data: { uid, ...userData, history: array } });
	} catch (err) {
		await saveError(err);
	}
};
