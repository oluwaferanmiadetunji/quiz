import React, { useState, useEffect } from 'react';
import { View, Dimensions, SafeAreaView, Picker } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { BLACK, GRAY, BLUE } from '../../components/Color';
import show from '../../utils/showMessage';
import { makeGetReq, makePostReq } from '../../utils/api';
import { _retrieveData } from '../../utils/storage';
import { Block, Input, Text } from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions, setCourse as SetCourse, setDuration as SetDuration } from '../../redux/questions';
import Loader from './Loader';
import QuestionLoader from './QuestionLoader';
const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [count, setCount] = useState(`${user.count}`);
	const [duration, setDuration] = useState(`${user.duration}`);
	const [loading, setLoading] = useState(false);
	const [questionLoading, setQuestionLoading] = useState(false);
	const [course, setCourse] = useState('');
	const [courses, setCourses] = useState([]);

	const handleSubmit = async () => {
		setLoading(true);
		const { data, message, status } = await makePostReq('quiz', { category: course, count });
		if (status === 'ok') {
			setLoading(false);
			dispatch(SetDuration(duration));
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
			setQuestionLoading(true);
			const { data } = await makeGetReq('courses');
			setCourses(data);
			setCourse(data[0].course);
			setQuestionLoading(false);
		};
		getData();
	}, []);
	return loading ? (
		<QuestionLoader />
	) : questionLoading ? (
		<Loader />
	) : (
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
				<Input
					placeholder='Exam Count'
					placeholderTextColor={BLACK}
					value={count}
					onChangeText={(text) => setCount(text)}
					type='number-pad'
					color={BLACK}
				/>
				<Text muted style={{ marginTop: 10 }}>
					Exam Duration
				</Text>
				<Input
					placeholder='Exam Duration (minutes)'
					placeholderTextColor={BLACK}
					onChangeText={(text) => setDuration(text)}
					value={duration}
					type='number-pad'
					color={BLACK}
				/>
			</Block>

			<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30 }} onPress={handleSubmit}>
				Start
			</CustomButton>
			<View style={{ marginTop: 30, flex: 1, flexDirection: 'row' }}>
				<CustomText style={{ fontSize: 16, marginLeft: 5, color: BLUE, fontWeight: 'bold' }} onPress={() => navigation.navigate('Update')}>
					Change Settings
				</CustomText>
			</View>
		</SafeAreaView>
	);
};
