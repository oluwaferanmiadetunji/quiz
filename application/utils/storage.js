import { AsyncStorage } from 'react-native';

export const _storeData = async (key, payload) => {
	await AsyncStorage.setItem(key, payload);
};

export const _retrieveData = async (key) => {
	let data;
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			data = value;
		}
	} catch (err) {
		data = null;
	}

	return data;
};

export const _deleteData = async (key) => {
	await AsyncStorage.removeItem(key);
};
