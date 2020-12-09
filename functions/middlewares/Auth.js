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
			return db
				.collection('users')
				.where('userId', '==', req.user.uid)
				.limit(1)
				.get()
				.then((data) => {
					req.user.email = data.docs[0].data().email;
					req.user.name = data.docs[0].data().name;
					req.user.activated = data.docs[0].data().activated;
					req.user.count = data.docs[0].data().count;
					return next();
				})
				.catch(() => {
					return res.status(403).json({ status: 'error', message: 'Error while verifying token', data: '' });
				});
		});
};
