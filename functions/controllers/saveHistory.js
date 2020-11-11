const { admin, db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const saveError = require('./saveError');

module.exports = async (req, res) => {
	const userId = req.body.uid;
	const data = req.body.data;

	db.ref(`user/${userId}/history/${uuidv4()}`)
		.set({
			createdAt: admin.database.ServerValue.TIMESTAMP,
			data,
		})
		.then(() => {
			db.ref('user').child(userId).child('total').set(admin.database.ServerValue.increment(data.total));
			db.ref('user').child(userId).child('correct').set(admin.database.ServerValue.increment(data.correct));
			db.ref('user').child(userId).child('times').set(admin.database.ServerValue.increment(1));
		})
		.then(() => {})
		.catch((err) => {
			saveError(err)
		});
};
