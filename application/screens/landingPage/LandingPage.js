import React, { useEffect } from 'react';
import { View, Image, Dimensions, SafeAreaView } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { GREEN, BLUE } from '../../components/Color';
import { _storeData } from '../../utils/storage';
import { makeGetReq } from '../../utils/api';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	useEffect(() => {
		const getCourses = async () => {
			const { data } = await makeGetReq('courses');
			await _storeData('Courses', JSON.stringify(data));
		};
		getCourses();
	}, []);

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.12 }}>
			<CustomText style={styles.text}>Want to take a few practice questions?</CustomText>
			<Image style={{ ...styles.image, width: width * 0.8, height: height * 0.35 }} source={require('../../assets/home.png')} />

			<CustomButton
				textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}
				style={{ marginTop: 30, borderRadius: 12 }}
				onPress={() => navigation.navigate('Login')}>
				Login
			</CustomButton>
			<View style={{ marginTop: 30, flex: 1, flexDirection: 'row' }}>
				<CustomText style={{ fontSize: 16, marginLeft: 5, color: BLUE, fontWeight: 'bold' }} onPress={() => navigation.navigate('Register')}>
					Register
				</CustomText>
			</View>
		</SafeAreaView>
	);
};
