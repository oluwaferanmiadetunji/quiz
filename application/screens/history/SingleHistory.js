import React from 'react';
import { View, Dimensions, SafeAreaView, Text, ScrollView } from 'react-native';
import styles from './style';
import { Card } from 'react-native-elements';
import { _retrieveData } from '../../utils/storage';
import dayjs from 'dayjs';

const { height, width } = Dimensions.get('window');

export default ({ route }) => {
	const { createdAt, data } = route.params.details;

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.01 }}>
			<View style={{ marginTop: 10, marginBottom: 10 }}>
				<Text muted style={{ fontSize: 18, marginBottom: 10 }}>
					Date: {dayjs(createdAt).format('MMM DD, YYYY h:mm a')}
				</Text>
				<Text muted style={{ fontSize: 18, marginBottom: 10 }}>
					Number of Correct: {data.correct}
				</Text>
				<Text muted style={{ fontSize: 18, marginBottom: 10 }}>
					Number of Questions: {data.total}
				</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				{data.questions.length > 0
					? data.questions.map((question, index) => (
							<Card containerStyle={question.isCorrect ? styles.correct : styles.incorrect} key={index}>
								<View style={{ width: width * 0.8 }}>
									<Text style={styles.historyText}>Question {index + 1}</Text>
									<Text style={styles.historyText}>Question: {question.question}</Text>
									<Text style={styles.historyText}>Your answer: {question.userPicked}</Text>
								</View>
							</Card>
					  ))
					: null}
			</ScrollView>
		</SafeAreaView>
	);
};
