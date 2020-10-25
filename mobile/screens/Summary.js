import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';
//argon
import { argonTheme } from '../constants/';
import dayjs from 'dayjs';
import { getData } from '../api/userApi';

const { width } = Dimensions.get('screen');

export default ({ navigation, route }) => {
	const data = route.params.data.data;
	console.log(data);

	BackHandler.addEventListener('hardwareBackPress', function () {
		return true;
	});

	React.useEffect(() => {
		const getUserData = async () => {
			const userData = await getData();
			await AsyncStorage.setItem('userData', JSON.stringify(userData));
		};
		getUserData();
	}, []);
	return (
		<Block flex center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text color={argonTheme.COLORS.MUTED} style={{ marginLeft: 20 }} size={15}>
					Summary
				</Text>
				<Block flex style={styles.group}>
					<Block flex space='between' style={styles.cardDescription}>
						<Text size={16} style={styles.text} bold>
							Date : {dayjs(new Date().toISOString()).format('MMMM DD, YYYY  hh:mm A')}
						</Text>
						<Text size={16} style={styles.text} bold>
							Number of Correct Questions : {data.correct}
						</Text>
						<Text size={16} style={styles.text} bold>
							Number of Total Questions : {data.total}
						</Text>
					</Block>
					{data.questions.map((question, index) => (
						<Block card flex style={styles.card} key={index}>
							<Block flex space='between' style={question.isCorrect ? styles.correct : styles.incorrect}>
								<Text size={16} style={styles.text} bold>
									Question {index + 1}
								</Text>
								<Text size={16} style={styles.text} bold>
									Question: {question.question}
								</Text>
								<Text size={16} style={styles.text} bold>
									Your answer: {question.userPicked}
								</Text>
							</Block>
						</Block>
						// <Card key={index}>
						// 	<CardItem style={question.isCorrect ? styles.correct : styles.incorrect}>
						// 		<Body>
						// 			<Text style={{ color: 'white', fontSize: 20 }}>Question {index + 1} </Text>
						// 			<Text style={{ color: 'white', fontSize: 18 }}>Question: {question.question} </Text>
						// 			<Text style={{ color: 'white', fontSize: 18 }}>Your answer: {question.userPicked} </Text>
						// 		</Body>
						// 	</CardItem>
						// </Card>
					))}
				</Block>
			</ScrollView>
		</Block>
	);
};

const styles = StyleSheet.create({
	group: {
		paddingTop: theme.SIZES.BASE,
		width: (width / 5) * 4,
	},

	text: { marginBottom: 10, flex: 1, flexWrap: 'wrap', color: argonTheme.COLORS.BALCK },
	correct: {
		backgroundColor: 'green',
		borderColor: 'green',
	},
	incorrect: {
		backgroundColor: 'red',
	},
});
