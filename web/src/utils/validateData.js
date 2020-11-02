/* eslint-disable no-useless-escape */
const validateData = (data) => {
	return data.trim() === '' ? false : true;
};
const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validateEmail = (email) => {
	return email.trim().match(re) ? true : false;
};

const validatePassword = (password) => {
	return password.trim().length > 6 ? true : false;
};
export { validateData, validateEmail, validatePassword };
