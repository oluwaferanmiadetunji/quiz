import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Picker, View, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Block, theme, Text } from 'galio-framework';
import { argonTheme } from '../constants/';
import show from '../components/showMessage';
import { getCourses, setQuiz } from '../api/userApi';
import { Button } from '../components';

const { width } = Dimensions.get('screen');

export default () => {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const [course, setCourse] = useState('');
	const [courses, setAllCourses] = useState([]);
	const [userId, setUserId] = useState('');
	const [duration, setDuration] = useState('');

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const c = course ? course : courses[0].course;
			const response = await setQuiz(c);
			if (response.status === 'ok') {
				setLoading(false);
				navigation.navigate('Quiz', {
					questions: response.data,
					duration,
					userId,
				});
			} else {
				setLoading(false);
				show(response.message, 'danger');
			}
		} catch (err) {
			console.log(err);
			show('Something went wrong!', 'danger');
			setLoading(false);
		}
	};

	useEffect(() => {
		const getCoursesFromStorage = async () => {
			setAllCourses(await getCourses());
			const { uid, duration } = JSON.parse(await AsyncStorage.getItem('userData'));
			setDuration(parseInt(duration));
			setUserId(uid);
		};
		getCoursesFromStorage();
	}, []);

	return (
		<Block flex center style={styles.home}>
			<Text bold size={16} style={styles.title}>
				Select Course
			</Text>
			<Block row space='evenly'>
				<View style={styles.pickerView}>
					<Picker selectedValue={course} style={styles.picker} onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}>
						{courses.map(({ course }, index) => (
							<Picker.Item label={course} value={course} key={index} />
						))}
					</Picker>
				</View>
			</Block>
			<View style={styles.button}>
				{!loading && (
					<Block middle>
						<Button
							color='primary'
							style={styles.createButton}
							onPress={() => {
								handleSubmit();
							}}>
							<Text bold size={14} color={argonTheme.COLORS.WHITE}>
								Submit
							</Text>
						</Button>
					</Block>
				)}

				{loading && (
					<Block middle>
						<Button color='primary' style={styles.createButton}>
							<Text bold size={14} color={argonTheme.COLORS.WHITE}>
								Connecting...
							</Text>
						</Button>
					</Block>
				)}
			</View>
		</Block>
	);
};

const styles = StyleSheet.create({
	home: {
		width: width,
	},
	title: {
		paddingBottom: theme.SIZES.BASE,
		paddingHorizontal: theme.SIZES.BASE * 2,
		marginTop: 44,
		color: argonTheme.COLORS.HEADER,
	},
	pickerView: {
		borderWidth: 1,
		borderColor: theme.COLORS.BLACK,
		borderRadius: 4,
	},
	picker: {
		height: 50,
		width: (width * 4) / 5,
	},
	button: {
		alignItems: 'center',
		marginTop: 30,
	},
	createButton: {
		width: width * 0.5,
		marginTop: 25,
		borderRadius: 7,
	},
});
