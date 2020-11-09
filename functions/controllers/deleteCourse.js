const { db } = require('../config/firebase');

module.exports = async (req, res) => {
	const id = req.params.id;
	try {
		await db.ref(`/courses/${id}`).remove();

		return res.status(200).json({ status: 'ok', message: 'Course successfully deleted', data: null });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: 'error', message: 'Error deleting course', data: null });
	}
};
