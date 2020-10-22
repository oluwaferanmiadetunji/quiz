const { firebase } = require('../config/firebase');
module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password.trim();
	if (email.trim() === '') {
		return res.status(400).json({ status: 'error', message: 'Email can not be empty', data: '' });
	} else if (password.trim() === '') {
		return res.status(400).json({ status: 'error', message: 'Password can not be empty', data: '' });
	}
	const data = await firebase.auth().signInWithEmailAndPassword(email, password);
	// firebase
	// 	.auth()
	// 	.signInWithEmailAndPassword(user.email, user.password)
	// 	.then((data) => {
	// 		return data.user.getIdToken();
	// 	})
	// 	.then((token) => {
	// 		return res.json({ token });
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
	// 			return res.status(400).json({
	// 				general: 'Wrong credentials! Please, try again',
	// 			});
	// 		} else {
	// 			return res.status(500).json({
	// 				general: 'Something went wrong! Please try again',
	// 			});
	// 		}
	// 	});
};
