import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, SafeAreaView, Picker } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { GREEN, BLACK, GRAY } from '../../components/Color';
import show from '../../utils/showMessage';
import { makePostReq } from '../../utils/api';
import { _retrieveData } from '../../utils/storage';
import { Block, Input, Text } from 'galio-framework';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [course, setCourse] = useState('');
	const [courses, setAllCourses] = useState([]);
	const [duration, setDuration] = useState('');
	const [count, setCount] = useState('');
	const [accountStatus, setStatus] = useState('');
	const [userId, setUserId] = useState('');

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const c = course ? course : courses[0].course;
			const { data, message, status } = await makePostReq('quiz', { count, status: accountStatus, category: c });
			if (status === 'ok') {
				setLoading(false);
				navigation.navigate('TakeQuiz', {
					questions: data,
					duration,
					userId,
				});
			} else {
				setLoading(false);
				show(message, 'danger');
			}
		} catch (err) {
			show('Something went wrong!', 'danger');
			setLoading(false);
		}
	};

	useEffect(() => {
		const getData = async () => {
			const data = JSON.parse(await _retrieveData('Courses'));
			const { duration, count, status, uid } = JSON.parse(await _retrieveData('User'));
			setCount(`${count}`);
			setDuration(`${duration}`);
			setAllCourses(data);
			setStatus(status);
			setUserId(uid);
		};
		getData();
	}, []);
	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.05 }}>
			<CustomText style={styles.title}>Set Quiz</CustomText>

			<Block style={{ width: width * 0.8 }}>
				<Text muted style={{ marginTop: 10 }}>
					Course
				</Text>
				<View style={{ ...styles.pickerView, width: width * 0.8, marginTop: 10 }}>
					<Picker selectedValue={course} style={styles.picker} onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}>
						{courses.map(({ course }, index) => (
							<Picker.Item label={course} value={course} key={index} />
						))}
					</Picker>
				</View>
				<Text muted style={{ marginTop: 10 }}>
					Exam Count
				</Text>
				<Input placeholder='Exam Count' placeholderTextColor={BLACK} value={count} type='number-pad' color={BLACK} />
				<Text muted style={{ marginTop: 10 }}>
					Exam Duration
				</Text>
				<Input placeholder='Exam Duration (minutes)' placeholderTextColor={BLACK} value={duration} type='number-pad' color={BLACK} />
			</Block>

			{loading && (
				<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30, backgroundColor: GRAY }}>
					Connecting...
				</CustomButton>
			)}

			{!loading && (
				<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30 }} onPress={handleSubmit}>
					Start
				</CustomButton>
			)}
			<View style={{ marginTop: 30, flex: 1, flexDirection: 'row' }}>
				<CustomText style={{ fontSize: 16, marginLeft: 5, color: GREEN, fontWeight: 'bold' }} onPress={() => navigation.navigate('Update')}>
					Change Settings
				</CustomText>
			</View>
		</SafeAreaView>
	);
};
