import React, { useState, useEffect } from 'react';
import { View, Dimensions, SafeAreaView, Picker } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { GREEN, BLACK, GRAY } from '../../components/Color';
import show from '../../utils/showMessage';
import { makeGetReq, makePostReq } from '../../utils/api';
import { _retrieveData } from '../../utils/storage';
import { Block, Input, Text } from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions, setCourse as SetCourse } from '../../redux/questions';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [loading, setLoading] = useState(false);
	const [course, setCourse] = useState('');
	const [courses, setCourses] = useState([]);

	const handleSubmit = async () => {
		setLoading(true);
		const { data, message, status } = await makePostReq('quiz', { category: course });
		if (status === 'ok') {
			setLoading(false);
			dispatch(setQuestions(data));
			dispatch(SetCourse(course));
			navigation.navigate('TakeQuiz');
		} else {
			setLoading(false);
			show(message, 'danger');
		}
	};

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			const { data } = await makeGetReq('courses');
			setCourses(data);
			setLoading(false);
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
				<Input placeholder='Exam Count' placeholderTextColor={BLACK} value={`${user.count}`} type='number-pad' color={BLACK} />
				<Text muted style={{ marginTop: 10 }}>
					Exam Duration
				</Text>
				<Input placeholder='Exam Duration (minutes)' placeholderTextColor={BLACK} value={`${user.duration}`} type='number-pad' color={BLACK} />
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
