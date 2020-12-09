const admin = require('firebase-admin');
const config = require('./firebaseConfig');
const firebase = require('firebase');
const serviceAccount = require('./ServiceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://quiz-a893a.firebaseio.com',
});

firebase.initializeApp(config);

const db = admin.firestore();

module.exports = { admin, db, firebase };
