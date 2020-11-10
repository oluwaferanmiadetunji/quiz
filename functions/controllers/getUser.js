const { db } = require('../config/firebase');

module.exports = async (req, res) => {
	const uid = req.params.id;
	let userData;
	await db.ref(`user/${uid}`).once('value', (snapshot) => {
		userData = snapshot.val();
	});
	const history = userData.history ? userData.history : [];
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
	res.status(200).json({ status: 'ok', message: 'Successful', data: { uid, history: array } });
};
