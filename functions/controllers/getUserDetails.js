const {db} = require('../config/firebase');

module.exports = async (req, res) => {
	const uid = req.user.uid;
	let userData;
	await db.ref(`user/${uid}`).once('value', (snapshot) => {
		userData = snapshot.val();
	});
	res.status(200).json({status: 'ok', message: 'Successful', data: {uid, ...userData}});
};
