import React, { useEffect, useState } from 'react';
import { View, Dimensions, SafeAreaView, Text, ScrollView } from 'react-native';
import styles from './style';
import { RED } from '../../components/Color';
import { Card } from 'react-native-elements';
import { _retrieveData } from '../../utils/storage';
import CustomButton from '../../components/Button';
import _ from 'lodash';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import Hr from 'react-native-hr-component';

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
			console.log(data);
			saveHistory(data);
			navigation.navigate('Summary', { data });
		}, 3000);
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
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.1 }}>
			<Modal isVisible={open} animationIn='bounceInUp' backdropColor='black' backdropOpacity={1}>
				<View style={{ flex: 1, marginTop: 50 }}>
					<Text style={{ color: 'white', fontSize: 22 }}>Are you sure you want to cancel this quiz?</Text>
					<CustomButton
						style={{ borderRadius: 20, marginTop: 30, backgroundColor: 'green' }}
						onPress={() => setOpen(false)}
						textStyling={{ color: 'white' }}>
						No, Stay
					</CustomButton>
					<CustomButton
						style={{ borderRadius: 20, marginTop: 30, backgroundColor: 'red' }}
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
				</View>
			</Modal>
			<View style={{ marginTop: 10, marginBottom: 10 }}>
				<CountDown
					until={duration * 60}
					digitStyle={{ backgroundColor: '#060814' }}
					digitTxtStyle={{ color: '#fff', fontWeight: 'bold' }}
					timeLabelStyle={{ color: '#fff', fontWeight: 'bold' }}
					timeToShow={['H', 'M', 'S']}
					onFinish={finish}
					size={19}
				/>
			</View>
			<ScrollView style={styles.scrollView}>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>Lol</Text>
						<Text muted>Email Address</Text>
					</View>
				</Card>
			</ScrollView>
		</SafeAreaView>
	);
};
