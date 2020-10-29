import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, SafeAreaView, Picker } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { GREEN } from '../../components/Color';
import show from '../../utils/showMessage';
import { makePostReq } from '../../utils/api';
import { _retrieveData } from '../../utils/storage';
import { Block, theme, Text } from 'galio-framework';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [course, setCourse] = useState('');
	const [courses, setAllCourses] = useState([]);
	const [userId, setUserId] = useState('');
	const [duration, setDuration] = useState('');

	useEffect(() => {
		const getData = async () => {
			const data = JSON.parse(await _retrieveData('Courses'));
			const u = JSON.parse(await _retrieveData('User'));
			setAllCourses(data);
		};
		getData();
	}, []);
	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.12 }}>
			<CustomText style={styles.title}>QUIZ</CustomText>

			<Block row space='evenly'>
				<View style={{ ...styles.pickerView, width: width * 0.8 }}>
					<Picker selectedValue={course} style={styles.picker} onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}>
						{courses.map(({ course }, index) => (
							<Picker.Item label={course} value={course} key={index} />
						))}
					</Picker>
				</View>
			</Block>

			<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30 }}>
				Start
			</CustomButton>
			<View style={{ marginTop: 30, flex: 1, flexDirection: 'row' }}>
				<CustomText style={{ fontSize: 16, marginLeft: 5, color: GREEN, fontWeight: 'bold' }} onPress={() => navigation.navigate('Update')}>
					Change Settings
				</CustomText>
			</View>
		</SafeAreaView>
	);
};
