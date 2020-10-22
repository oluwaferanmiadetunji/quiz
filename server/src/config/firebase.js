const admin = require('firebase-admin');
const firebase = require('firebase');
const SA = require('./ServiceAccount.json');
const config = require('./firebaseConfig');

admin.initializeApp({
	credential: admin.credential.cert(SA),
	databaseURL: 'https://quiz-a893a.firebaseio.com',
});

firebase.initializeApp(config);

const db = admin.firestore();

module.exports = { admin, firebase, db };
