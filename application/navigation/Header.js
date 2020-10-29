import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import CustomText from '../components/Text';
import { _retrieveData } from '../utils/storage';

export default () => {
	const [name, setName] = useState('');
	useEffect(() => {
		const getData = async () => {
			const data = JSON.parse(await _retrieveData('User'));
			setName(data.name);
		};
		getData();
	}, []);
	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<Image style={{ width: 50, height: 50 }} source={require('../assets/avatar.png')} />
			<CustomText style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Hi, {name}</CustomText>
		</View>
	);
};
