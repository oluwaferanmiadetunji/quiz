import React from 'react';
import { View, Dimensions, SafeAreaView, Text, ScrollView, BackHandler } from 'react-native';
import styles from './style';
import { Card } from 'react-native-elements';
import { _retrieveData, _storeData } from '../../utils/storage';
import dayjs from 'dayjs';
import CustomText from '../../components/Text';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const { data, total, correct } = useSelector((state) => state.question.answered);

	BackHandler.addEventListener('hardwareBackPress', function () {
		navigation.navigate('Home');
		return true;
	});

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.075 }}>
			<CustomText style={styles.title}>Summary</CustomText>
			<View style={{ marginTop: 20, marginBottom: 10 }}>
				<Text muted style={{ fontSize: 18, marginBottom: 10 }}>
					Date : {dayjs(new Date().toISOString()).format('MMMM DD, YYYY  hh:mm A')}
				</Text>
				<Text muted style={{ fontSize: 18, marginBottom: 10 }}>
					Number of Correct: {correct}
				</Text>
				<Text muted style={{ fontSize: 18, marginBottom: 10 }}>
					Number of Questions: {total}
				</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				{data.length > 0
					? data.map((question, index) => (
							<Card containerStyle={question.isCorrect ? styles.correct : styles.incorrect} key={index}>
								<View style={{ width: width * 0.8 }}>
									<Text style={styles.historyText}>Question {index + 1}</Text>
									<Text style={styles.historyText}>Question: {question.question}</Text>
									<Text style={styles.historyText}>Your answer: {question.selectedAnswer}</Text>
								</View>
							</Card>
					  ))
					: null}
			</ScrollView>
		</SafeAreaView>
	);
};
