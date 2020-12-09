const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

module.exports = async (error) => {
	try {
		await db.collection('errors').add({
			createdAt: new Date().toISOString(),
			error,
		});
	} catch (err) {
		console.log(err);
	}
};
