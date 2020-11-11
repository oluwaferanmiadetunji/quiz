import React, { useEffect, useState } from 'react';
import { View, Dimensions, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import { Card } from 'react-native-elements';
import { _retrieveData } from '../../utils/storage';
import CustomButton from '../../components/Button';
import _ from 'lodash';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import { Block } from 'galio-framework';
import { makePostReq } from '../../utils/api';

const { height, width } = Dimensions.get('window');

export default ({ navigation, route }) => {
	const [index, setIndex] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [answer, setAnswer] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [correctIndex, setCorrectIndex] = useState(null);
	const [numCorrect, setNumCorrect] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState([]);
	const [answered, setAnswered] = useState(false);
	const [open, setOpen] = useState(false);
	const { duration, questions, userId } = route.params;

	useEffect(() => {
		let q = questions[index];
		setCurrentQuestion(q);
		let shuffledAnswers = _.shuffle([...q.incorrectAnswers, q.correctAnswer]);
		setCorrectIndex(shuffledAnswers.indexOf(q.correctAnswer));
		setAnswer(shuffledAnswers);
	}, [index]);

	const selectAnswer = (index) => {
		setSelectedIndex(index);
	};

	const submit = () => {
		if (selectedIndex === correctIndex) {
			setNumCorrect(numCorrect + 1);
		}
		setAnswered(true);
		let questionData = {};
		questionData.isCorrect = selectedIndex === correctIndex ? true : false;
		questionData.userPicked = answer[selectedIndex];
		questionData.question = currentQuestion.question;
		questionData.correctAnswer = currentQuestion.correctAnswer;

		setAnsweredQuestions([...answeredQuestions, questionData]);

		setTimeout(() => {
			index + 1 != questions.length ? next() : finish();
		}, 3000);
	};

	const next = () => {
		setSelectedIndex(null);
		setAnswered(false);
		setIndex(index + 1);
	};

	const finish = async () => {
		setTimeout(() => {
			const data = {
				uid: userId,
				data: { questions: answeredQuestions, correct: numCorrect, total: questions.length },
			};
			makePostReq('user/history/save', data)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
			navigation.navigate('Summary', { data });
		}, 1500);
	};

	const answerClass = (index) => {
		let answerClass = styles.button;
		if (!answered && selectedIndex === index) {
			answerClass = styles.selected;
		} else if (answered && correctIndex === index) {
			answerClass = styles.correct;
		} else if (answered && selectedIndex === index && correctIndex !== index) {
			answerClass = styles.incorrect;
		}
		return answerClass;
	};
	const textClass = (index) => {
		let textClass = styles.black;
		if (!answered && selectedIndex === index) {
			textClass = styles.white;
		} else if (answered && correctIndex === index) {
			textClass = styles.black;
		} else if (answered && selectedIndex === index && correctIndex !== index) {
			textClass = styles.white;
		}
		return textClass;
	};

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.07 }}>
			<Modal isVisible={open} animationIn='bounceInUp' backdropColor='black' backdropOpacity={1}>
				<Block style={{ width: width * 0.8 }}>
					<Text style={{ color: 'white', fontSize: 22, marginLeft: 15 }}>Are you sure you want to cancel this quiz?</Text>
					<CustomButton
						style={{ marginTop: 30, backgroundColor: 'green', marginLeft: 15 }}
						onPress={() => setOpen(false)}
						textStyling={{ color: 'white' }}>
						No, Stay
					</CustomButton>
					<CustomButton
						style={{ marginTop: 30, backgroundColor: 'red', marginLeft: 15 }}
						onPress={() => {
							setIndex(0);
							setCurrentQuestion({});
							setAnswer([]);
							setSelectedIndex(null);
							setCorrectIndex(null);
							setNumCorrect(0);
							setAnsweredQuestions([]);
							setAnswered(false);
							setOpen(false);
							navigation.navigate('Home');
						}}
						textStyling={{ color: 'white' }}>
						Yes, Cancel
					</CustomButton>
				</Block>
			</Modal>
			<View style={{ marginBottom: 10 }}>
				<CountDown
					until={duration * 60}
					digitStyle={{ backgroundColor: '#060814' }}
					digitTxtStyle={{ color: '#fff', fontWeight: 'bold' }}
					timeLabelStyle={{ color: '#000', fontSize: 10 }}
					timeToShow={['H', 'M', 'S']}
					onFinish={finish}
					size={15}
				/>
			</View>
			<ScrollView style={styles.scrollView}>
				<Text muted style={{ textAlign: 'center', fontSize: 18 }}>
					Question {index + 1} / {questions.length}
				</Text>
				<Card containerStyle={{ marginBottom: 30 }}>
					<View style={{ width: width * 0.8 }}>
						<Text muted style={{ textAlign: 'center', fontSize: 22 }}>
							{currentQuestion.question}
						</Text>
					</View>
				</Card>

				{answer &&
					answer.map((ans, index) => (
						<TouchableOpacity
							onPress={() => {
								answered ? null : selectAnswer(index);
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
			<Block style={{ width: width * 0.8, marginBottom: height * 0.05 }}>
				<CustomButton
					style={{ backgroundColor: 'green', width: width * 0.8, marginBottom: 20 }}
					onPress={() => {
						selectedIndex === null || answered ? null : submit();
					}}
					textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}>
					Submit
				</CustomButton>
				<CustomButton
					style={{ backgroundColor: '#FB6340', width: width * 0.8, marginBottom: 20 }}
					onPress={finish}
					textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}>
					Finish Quiz
				</CustomButton>
				<CustomButton
					style={{ backgroundColor: 'red', width: width * 0.8, marginBottom: 20 }}
					onPress={() => setOpen(true)}
					textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}>
					Cancel Quiz
				</CustomButton>
			</Block>
		</SafeAreaView>
	);
};
