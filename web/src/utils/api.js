import axios from 'axios';
const BASE_URL = 'https://us-central1-quiz-a893a.cloudfunctions.net/api';

const Token = localStorage.Token | '';

export const makePostReq = async (path, data) => {
	const config = {
		headers: { Authorization: `Bearer ${Token}` },
	};
	try {
		const response = await axios.post(`${BASE_URL}/${path}`, data, config);
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const makeGetReq = async (path) => {
	const config = {
		headers: { Authorization: `Bearer ${Token}` },
	};
	try {
		const response = await axios.get(`${BASE_URL}/${path}`, config);
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};
