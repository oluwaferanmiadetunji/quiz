const {isEmail, isEmpty, isGreater} = require('./helperFunctions');

module.exports = ({email, password}) => {
	let message = '';
	let error = false;
	if (isEmpty(email)) {
		message = 'Email can not be empty';
		error = true;
	} else if (!isEmail(email)) {
		message = 'Invalid email address';
		error = true;
	} else if (isEmpty(password)) {
		message = 'Password can not be empty';
		error = true;
	} else if (!isGreater(password, 6)) {
		message = 'Password must be greater than 6 characters';
		error = true;
	}

	return Object.freeze({
		error,
		message,
	});
};
