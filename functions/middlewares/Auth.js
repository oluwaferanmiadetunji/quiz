const { admin, db } = require('../config/firebase');

module.exports = (req, res, next) => {
	let idToken;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else {
		return res.status(403).json({ status: 'error', message: 'Unauthorized', data: '' });
	}
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			req.user = decodedToken;
			db.collection('users')
				.doc(req.user.uid)
				.get()
				.then((doc) => {
					req.user.email = doc.data().email;
					req.user.name = doc.data().name;
					req.user.activated = doc.data().activated;
					req.user.count = doc.data().count;
				});
			return next();
		})
		.catch(() => {
			return res.status(403).json({ status: 'error', message: 'Error while verifying token', data: '' });
		});
};
