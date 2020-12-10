import 'react-native-gesture-handler';
import React from 'react';
import { View, Image } from 'react-native';
import CustomText from '../components/Text';
import { _retrieveData } from '../utils/storage';
import { useSelector } from 'react-redux';

export default () => {
	const { name } = useSelector((state) => state.user);

	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<Image style={{ width: 50, height: 50 }} source={require('../assets/avatar.png')} />
			<CustomText style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Hi, {name}</CustomText>
		</View>
	);
};
