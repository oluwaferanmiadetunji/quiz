import React from 'react';
import { ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';
//argon
import { argonTheme } from '../constants/';
import dayjs from 'dayjs';

const { width } = Dimensions.get('screen');

export default ({ route }) => {
	const { createdAt, data } = route.params.details;
	return (
		<Block flex center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Block flex style={styles.group}>
					<Block row space='between' style={{ marginBottom: 10 }}>
						<Block middle>
							<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
								Date:
							</Text>
						</Block>
						<Block middle>
							<Text size={14} style={styles.cardTitle} style={{ marginBottom: 10 }}>
								{createdAt ? dayjs(createdAt).format('MMMM DD, YYYY  hh:mm A') : null}
							</Text>
						</Block>
					</Block>
					<Block row space='between' style={{ marginBottom: 10 }}>
						<Block middle>
							<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
								Number of Correct :
							</Text>
						</Block>
						<Block middle>
							<Text size={14} style={styles.cardTitle} style={{ marginBottom: 10 }}>
								{data ? data.correct : null}
							</Text>
						</Block>
					</Block>
					<Block row space='between' style={{ marginBottom: 10 }}>
						<Block middle>
							<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
								Number of Questions :
							</Text>
						</Block>
						<Block middle>
							<Text size={14} style={styles.cardTitle} style={{ marginBottom: 10 }}>
								{data ? data.total : null}
							</Text>
						</Block>
					</Block>

					{data.questions.length > 0
						? data.questions.map((question, index) => (
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
						  ))
						: null}
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
	card: {
		backgroundColor: theme.COLORS.WHITE,
		marginVertical: theme.SIZES.BASE,
		borderWidth: 0,
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
	},
	cardTitle: {
		flex: 1,
		flexWrap: 'wrap',
		paddingBottom: 6,
		color: theme.COLORS.MUTED,
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
