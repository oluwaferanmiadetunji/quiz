import axios from 'axios';
import { _retrieveData } from './storage';
const BASE_URL = 'https://us-central1-quiz-a893a.cloudfunctions.net/api';

export const makePostReq = async (path, data) => {
	const token = await _retrieveData('Token');
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	try {
		const response = await axios.post(`${BASE_URL}/${path}`, data, config);
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const makeGetReq = async (path) => {
	const token = await _retrieveData('Token');
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	try {
		const response = await axios.get(`${BASE_URL}/${path}`, config);
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};
