import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Dimensions, View } from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';
import _ from 'lodash';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import Hr from 'react-native-hr-component';
import { saveHistory } from '../api/userApi';

import { Images, argonTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

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
		<Block flex middle>
			<Modal isVisible={open} animationIn='bounceInUp' backdropColor='black' backdropOpacity={1}>
				<View style={{ flex: 1, marginTop: 50 }}>
					<Text style={{ color: 'white', fontSize: 22 }}>Are you sure you want to cancel this quiz?</Text>
					<Button style={{ borderRadius: 20, marginTop: 30, backgroundColor: 'green' }} onPress={() => setOpen(false)}>
						<Text style={{ color: 'white' }}>No, Stay</Text>
					</Button>
					<Button
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
						}}>
						<Text style={{ color: 'white' }}>Yes, Cancel</Text>
					</Button>
				</View>
			</Modal>

			<ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }}>
				<Block flex middle>
					<Block style={styles.registerContainer}>
						<Block flex>
							<Block style={{ marginTop: 20 }}>
								<CountDown
									until={duration * 60}
									digitStyle={{ backgroundColor: '#060814' }}
									digitTxtStyle={{ color: '#fff', fontWeight: 'bold' }}
									timeLabelStyle={{ color: '#fff', fontWeight: 'bold' }}
									timeToShow={['H', 'M', 'S']}
									onFinish={finish}
									size={19}
								/>
								<Text color={argonTheme.COLORS.MUTED} style={{ marginLeft: 20 }} size={15}>
									Question {index + 1} / {questions.length + 1}:
								</Text>
								<Hr lineColor={argonTheme.COLORS.MUTED} text='' />
								<Text color={argonTheme.COLORS.BLACK} style={{ marginLeft: 20 }} size={18}>
									{currentQuestion.question}
								</Text>
								<Hr lineColor={argonTheme.COLORS.MUTED} text='' />
							</Block>
							<Block flex center>
								{answer &&
									answer.map((ans, index) => (
										<Button
											style={answerClass(index)}
											key={index}
											onPress={() => selectAnswer(index)}
											disabled={answered}
											shadowless
											textStyle={textClass(index)}>
											{ans}
										</Button>
									))}
							</Block>
							<Block center>
								<Button
									style={{
										width: width - theme.SIZES.BASE * 4,
										height: theme.SIZES.BASE * 3,
										shadowRadius: 0,
										shadowOpacity: 0,
										marginBottom: 20,
										backgroundColor: argonTheme.COLORS.SUCCESS,
									}}
									textStyle={{ color: argonTheme.COLORS.BLACK }}
									onPress={submit}
									disabled={selectedIndex === null || answered}>
									Submit
								</Button>
								<Button
									style={{
										width: width - theme.SIZES.BASE * 4,
										height: theme.SIZES.BASE * 3,
										shadowRadius: 0,
										shadowOpacity: 0,
										marginBottom: 20,
										backgroundColor: argonTheme.COLORS.WARNING,
									}}
									textStyle={{ color: argonTheme.COLORS.WHITE }}
									onPress={finish}>
									Finish Quiz
								</Button>
								<Button
									style={{
										width: width - theme.SIZES.BASE * 4,
										height: theme.SIZES.BASE * 3,
										shadowRadius: 0,
										shadowOpacity: 0,
										marginBottom: 20,
										backgroundColor: argonTheme.COLORS.ERROR,
									}}
									textStyle={{ color: argonTheme.COLORS.WHITE }}
									onPress={() => setOpen(true)}>
									Cancel Quiz
								</Button>
							</Block>
						</Block>
					</Block>
				</Block>
			</ImageBackground>
		</Block>
	);
};

const styles = StyleSheet.create({
	registerContainer: {
		width: width * 0.95,
		height: height * 0.9,
		backgroundColor: '#F4F5F7',
		borderRadius: 4,
		shadowColor: argonTheme.COLORS.BLACK,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 8,
		shadowOpacity: 0.1,
		elevation: 1,
		overflow: 'hidden',
	},

	button: {
		borderRadius: 20,
		borderColor: '#1976d2',
		width: width * 0.8,
		height: 'auto',
		marginTop: 20,
		backgroundColor: argonTheme.COLORS.INPUT,
		color: argonTheme.COLORS.BLACK,
	},

	correct: {
		borderRadius: 20,
		borderColor: 'green',
		width: width * 0.8,
		height: 'auto',
		marginTop: 30,
		backgroundColor: argonTheme.COLORS.SUCCESS,
	},
	white: {
		color: argonTheme.COLORS.WHITE,
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 14,
	},
	black: {
		color: argonTheme.COLORS.BLACK,
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 14,
	},
	incorrect: {
		borderRadius: 20,
		borderColor: 'red',
		width: width * 0.8,
		height: 'auto',
		marginTop: 30,
		backgroundColor: argonTheme.COLORS.LABEL,
	},
	selected: {
		borderRadius: 20,
		borderColor: 'blue',
		width: width * 0.8,
		height: 'auto',
		marginTop: 30,
		backgroundColor: 'blue',
	},
});
