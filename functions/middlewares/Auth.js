const {admin, db} = require('../config/firebase');

module.exports = (req, res, next) => {
	let idToken;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else {
		return res.status(403).json({status: 'error', message: 'Unauthorized', data: ''});
	}	
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			req.user = decodedToken;
			db.ref(`user/${req.user.uid}`).once('value', (snapshot) => {
				req.user.email = snapshot.val().email;
				req.user.name = snapshot.val().name;
				req.user.status = snapshot.val().status;
				req.user.count = (snapshot.val().count);
			});
			return next();
		})
		.catch((err) => {
			return res.status(403).json({status: 'error', message: 'Error while verifying token', data: ''});
		});
};
