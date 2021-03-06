import React, { useState, useEffect } from 'react';
import { View, Dimensions, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestion, setIndex, saveQuestion, saveAnsweredQuestions } from '../../redux/questions';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import { Block } from 'galio-framework';
import CustomButton from '../../components/Button';
import { Card } from 'react-native-elements';
import styles from './style';
import { makePostReq } from '../../utils/api';
import Loader from './Loader';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const dispatch = useDispatch();
	const { all, single, index, course, duration, answeredQuestions } = useSelector((state) => state.question);

	const [selectedIndex, setSelectedIndex] = useState(null);

	const [open, setOpen] = useState(false);

	const [loading, setLoading] = useState(false);

	const finish = async () => {
		const total = answeredQuestions.length;
		const correct = answeredQuestions.filter((data) => data.isCorrect === true).length;

		dispatch(saveAnsweredQuestions({ data: answeredQuestions, total, correct }));
		setLoading(true);
		await makePostReq('user/history/save', { data: answeredQuestions, total, correct });
		setLoading(false);
		dispatch(setIndex(0));
		navigation.navigate('Summary');
	};

	const selectAnswer = (index) => {
		setSelectedIndex(index);
	};

	const answerClass = (index) => {
		let answerClass = styles.button;
		if (selectedIndex === index) {
			answerClass = styles.selected;
		}
		return answerClass;
	};

	const textClass = (index) => {
		let answerClass = styles.black;
		if (selectedIndex === index) {
			answerClass = styles.white;
		}
		return answerClass;
	};

	const submitAnswer = () => {
		let isCorrect = false;
		const selectedAnswer = single.answers[selectedIndex];
		if (selectedAnswer === single.correctAnswer) {
			isCorrect = true;
		}
		dispatch(saveQuestion({ id: single.id, isCorrect, selectedAnswer }));
		setSelectedIndex(null);
	};

	const next = () => {
		if (selectedIndex !== null) {
			submitAnswer();
			if (index + 1 < all.length) {
				dispatch(setIndex(index + 1));
			} else {
				finish();
			}
		}
	};

	useEffect(() => {
		dispatch(setQuestion(all[index]));
	}, [index]);

	return loading ? (
		<Loader />
	) : (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.07 }}>
			<Modal isVisible={open} animationIn='bounceInUp' backdropColor='black' backdropOpacity={1}>
				<Block style={{ width: width * 0.8 }}>
					<Text style={{ color: 'white', fontSize: 18, marginLeft: 15, textAlign: 'center' }}>Are you sure you want to cancel this quiz?</Text>
					<CustomButton
						style={{ marginTop: 30, backgroundColor: 'green', marginLeft: 15 }}
						onPress={() => setOpen(false)}
						textStyling={{ color: 'white', textAlign: 'center' }}>
						No, Stay
					</CustomButton>
					<CustomButton
						style={{ marginTop: 30, backgroundColor: 'red', marginLeft: 15 }}
						onPress={() => {
							dispatch(setIndex(0));
							setOpen(false);
							navigation.navigate('Home');
						}}
						textStyling={{ color: 'white', textAlign: 'center' }}>
						Yes, Cancel
					</CustomButton>
				</Block>
			</Modal>
			<View style={{ marginBottom: 10 }}>
				<CountDown
					until={parseInt(duration, 10) * 60}
					digitStyle={{ backgroundColor: '#060814' }}
					digitTxtStyle={{ color: '#fff', fontWeight: 'bold' }}
					timeLabelStyle={{ color: '#000', fontSize: 10 }}
					timeToShow={['H', 'M', 'S']}
					onFinish={finish}
					size={15}
				/>
			</View>
			<ScrollView style={styles.scrollView}>
				<Text muted style={{ textAlign: 'center', fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
					{course}
				</Text>
				<Text muted style={{ textAlign: 'center', fontSize: 14 }}>
					Question {index + 1} / {all.length}
				</Text>
				<Card containerStyle={{ marginBottom: 30, borderColor: 'white' }}>
					<View style={{ width: width * 0.8 }}>
						<Text muted style={{ textAlign: 'left', fontSize: 18 }}>
							{single.question}
						</Text>
					</View>
				</Card>

				{single.answers &&
					single.answers.map((ans, index) => (
						<TouchableOpacity
							onPress={() => {
								selectAnswer(index);
							}}
							key={index}>
							<Card containerStyle={answerClass(index)}>
								<View style={{ width: width * 0.8 }}>
									<Text muted style={textClass(index)}>
										{ans}
									</Text>
								</View>
							</Card>
						</TouchableOpacity>
					))}
			</ScrollView>
			<Block style={{ width: width * 0.8, marginBottom: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
				{index + 1 < all.length ? (
					<CustomButton style={{ backgroundColor: 'green', marginBottom: 20 }} onPress={next} textStyling={{ textAlign: 'center', fontSize: 16 }}>
						Next
					</CustomButton>
				) : (
					<CustomButton style={{ backgroundColor: 'green', marginBottom: 20 }} onPress={next} textStyling={{ textAlign: 'center', fontSize: 16 }}>
						Submit
					</CustomButton>
				)}
				<CustomButton
					style={{ backgroundColor: 'red', marginBottom: 20 }}
					onPress={() => setOpen(true)}
					textStyling={{ textAlign: 'center', fontSize: 16 }}>
					Cancel
				</CustomButton>
			</Block>
		</SafeAreaView>
	);
};
