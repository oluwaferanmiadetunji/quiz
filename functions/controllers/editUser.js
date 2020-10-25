const {db} = require('../config/firebase');

module.exports = async (req, res) => {
	const count = req.body.count;
	const duration = req.body.duration;
	const name = req.body.name;
	const id = req.user.uid;
	return db
		.ref(`/user/${id}`)
		.update({
			count,
			duration,
			name,
		})
		.then(() => {
			return res.status(200).json({status: 'ok', message: 'Account successfully updated'});
		})
		.catch(() => {
			return res.status(500).json({status: 'error', message: 'Error updating account'});
		});
};
