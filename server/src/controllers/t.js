exports.signup = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		handle: req.body.handle,
	};

	const { valid, errors } = validateSignUpData(newUser);
	if (!valid) return res.status(400).json(errors);

	const noImg = 'no-img.jpeg';

	let token, userId;
	db.doc(`/users/${newUser.handle}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json({
					handle: 'This handle is already taken',
				});
			} else {
				return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				handle: newUser.handle,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
				userId,
			};
			return db.doc(`/users/${newUser.handle}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({
				token: token,
				message: 'User created successfully',
			});
		})
		.catch((err) => {
			console.log(err);
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({
					email: 'Email is already in use',
				});
			} else {
				return res.status(500).json({
					general: 'Something went wrong! Please try again',
				});
			}
		});
};
