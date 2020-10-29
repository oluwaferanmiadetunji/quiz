import React from 'react';
import { View, Image, Dimensions, SafeAreaView } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { GREEN } from '../../components/Color';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.12 }}>
			<CustomText style={styles.title}>History</CustomText>
			<Image style={{ ...styles.image, width: width * 0.8, height: height * 0.35 }} source={require('../../assets/home.png')} />
			<CustomText style={styles.text}>Want to take a few practice questions?</CustomText>
			<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30 }}>
				Start
			</CustomButton>
			<View style={{ marginTop: 30, flex: 1, flexDirection: 'row' }}>
				<CustomText style={{ fontSize: 16, fontWeight: 'bold' }}>Have an account?</CustomText>
				<CustomText style={{ fontSize: 16, marginLeft: 5, color: GREEN, fontWeight: 'bold' }} onPress={() => navigation.navigate('Login')}>
					Sign In
				</CustomText>
			</View>
		</SafeAreaView>
	);
};
