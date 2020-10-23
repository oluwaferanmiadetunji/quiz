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
		.then(async (decodedToken) => {
			req.user = decodedToken;
			try {
				const data = await db.collection('users').where('userId', '==', req.user.uid).limit(1).get();
				req.user.count = data.docs[0].data().count;
				req.user.status = data.docs[0].data().status;
				return next();
			} catch (err) {
				return res.status(403).json({ status: FAILURE, message: 'Unauthorized request', data: err });
			}
		});
};
