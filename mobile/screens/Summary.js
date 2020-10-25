import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions, AsyncStorage, BackHandler } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants/';
import dayjs from 'dayjs';
import { getData } from '../api/userApi';

const { width, height } = Dimensions.get('screen');

export default ({ navigation, route }) => {
	const data = route.params.data.data;
	console.log(data);

	BackHandler.addEventListener('hardwareBackPress', function () {
		navigation.navigate('Home');
		return true;
	});

	useEffect(() => {
		const getUserData = async () => {
			const userData = await getData();
			await AsyncStorage.setItem('userData', JSON.stringify(userData));
		};
		getUserData();
	}, []);
	return (
		<Block flex center style={styles.home}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Block flex center>
					<Text color={argonTheme.COLORS.BLACK} style={{ marginTop: 20 }} size={22}>
						Summary
					</Text>
				</Block>
				<Block flex style={styles.group}>
					<Block flex space='between' style={styles.cardDescription}>
						<Text size={16} style={styles.text} bold>
							Date : {dayjs(new Date().toISOString()).format('MMMM DD, YYYY  hh:mm A')}
						</Text>
						<Text size={16} style={styles.text} bold>
							Number of Correct Questions : {data.correct}
						</Text>
						<Text size={16} style={styles.text} bold>
							Number of Total Questions : {data.questions.length}
						</Text>
					</Block>
					{data.questions.map((question, index) => (
						<Block flex style={question.isCorrect ? styles.correct : styles.incorrect} key={index}>
							<Text size={16} style={styles.info} bold>
								Question {index + 1}
							</Text>
							<Text size={16} style={styles.info} bold>
								Question: {question.question}
							</Text>
							<Text size={16} style={styles.info} bold>
								Your answer: {question.userPicked}
							</Text>
						</Block>
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
	home: {
		width: width,
		paddingBottom: theme.SIZES.BASE,
		paddingHorizontal: theme.SIZES.BASE * 2,
		marginTop: height / 10,
	},
	text: { marginBottom: 10, flex: 1, flexWrap: 'wrap', color: argonTheme.COLORS.DEFAULT, fontSize: 15 },
	info: { marginBottom: 10, flex: 1, flexWrap: 'wrap', color: argonTheme.COLORS.BLACK, fontSize: 18, fontWeight: '100' },
	correct: {
		backgroundColor: 'green',
		borderColor: 'green',
		backgroundColor: theme.COLORS.SUCCESS,
		marginVertical: theme.SIZES.BASE,
		borderWidth: 0,
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
		marginBottom: 10,
		padding: 10,
	},
	incorrect: {
		backgroundColor: theme.COLORS.ERROR,
		marginVertical: theme.SIZES.BASE,
		borderWidth: 0,
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
		marginBottom: 10,
		padding: 10,
	},
	card: {
		backgroundColor: theme.COLORS.WHITE,
		marginVertical: theme.SIZES.BASE,
		borderWidth: 0,
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
		marginBottom: 10,
	},
});
