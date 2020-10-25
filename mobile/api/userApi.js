const baseUrl = 'https://us-central1-quiz-a893a.cloudfunctions.net/api/';
import { AsyncStorage } from 'react-native';

// get user token
const _retrieveToken = async () => {
	try {
		const value = await AsyncStorage.getItem('userToken');
		if (value !== null) {
			return value;
		}
	} catch (error) {
		return '';
	}
};

// get user data
const _retrieveData = async () => {
	try {
		const value = await AsyncStorage.getItem('userData');
		if (value !== null) {
			return value;
		}
	} catch (error) {
		return '';
	}
};

// Register User
export const registerUser = async (name, email, password) => {
	try {
		const response = await fetch(`${baseUrl}user/register`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ name, email, password }),
		});
		if (response.ok) {
			const results = await response.json();
			return results;
		} else {
			const { message } = await response.json();
			return message;
		}
	} catch (err) {
		throw new Error(err);
	}
};

// Login User
export const loginUser = async (email, password) => {
	try {
		const response = await fetch(`${baseUrl}user/login`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		if (response.ok) {
			const { data } = await response.json();
			return data;
		} else {
			const { message } = await response.json();
			return message;
		}
	} catch (err) {
		throw new Error(err);
	}
};

// Reset Password
export const forgotPassword = async (email) => {
	try {
		const response = await fetch(`${baseUrl}reset`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email }),
		});
		return await response.json();
	} catch (err) {
		throw new Error(err);
	}
};

// Get User Data
export const getData = async () => {
	try {
		// get user token
		const token = await _retrieveToken();
		const response = await fetch(`${baseUrl}user`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.ok) {
			const { data } = await response.json();
			return data;
		} else {
			const { message } = await response.json();
			return message;
		}
	} catch (err) {
		throw new Error(err);
	}
};

// Get User Data
export const getHistory = async () => {
	try {
		// get user token
		const token = await _retrieveToken();
		const response = await fetch(`${baseUrl}user/history`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.ok) {
			const { data } = await response.json();
			return data;
		} else {
			const { message } = await response.json();
			return message;
		}
	} catch (err) {
		throw new Error(err);
	}
};

// Update User
export const requestUpdate = async ({ count, name, duration }) => {
	try {
		// get user token
		const token = await _retrieveToken();
		const response = await fetch(`${baseUrl}user/update`, {
			method: 'POST',
			headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({ count, name, duration }),
		});
		return response.json();
	} catch (err) {
		throw new Error(err);
	}
};

// Get Courses
export const getCourses = async () => {
	try {
		const response = await fetch(`${baseUrl}courses`, {
			method: 'GET',
		});
		if (response.ok) {
			const { data } = await response.json();
			return data;
		} else {
			const { message } = await response.json();
			return message;
		}
	} catch (err) {
		throw new Error(err);
	}
};

export const setQuiz = async (category) => {
	try {
		// get user data
		const { count, status } = JSON.parse(await _retrieveData());
		console.log(count);
		const response = await fetch(`${baseUrl}quiz`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ count, status, category }),
		});

		return await response.json();
	} catch (err) {
		throw new Error(err);
	}
};

// Save history User
export const saveHistory = async (data) => {
	try {
		const response = await fetch(`${baseUrl}user/history/save`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data),
		});
		return await response.json();
	} catch (err) {
		throw new Error(err);
	}
};

export const makePostReq = async (path, data) => {
	const token = await _retrieveToken();
	try {
		const response = await fetch(`${baseUrl}/${path}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data),
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.json();
	} catch (err) {
		return null;
	}
};

export const makeGetReq = async (path) => {
	const token = await _retrieveToken();
	try {
		const response = await fetch(`${baseUrl}/${path}`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.json();
	} catch (err) {
		return null;
	}
};
