const { admin, db } = require('../config/firebase');
const { FAILURE } = require('../config/constants');

module.exports = (req, res, next) => {
	let idToken;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else {
		return res.status(403).json({ status: FAILURE, message: 'Unauthorized request', data: '' });
	}

	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			req.user = decodedToken;
			return db
				.collection('admins')
				.where('userId', '==', req.user.uid)
				.limit(1)
				.get()
				.then((data) => {
					req.user.userId = data.docs[0].data().userId;
					return next();
				})
				.catch((err) => {
					return res.status(403).json({ status: FAILURE, message: 'Unauthorized request', data: err });
				});
		});
};
