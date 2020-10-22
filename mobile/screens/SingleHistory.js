import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';
//argon
import { argonTheme } from '../constants/';
import dayjs from 'dayjs';
import filter from '../components/filterData';

const { width } = Dimensions.get('screen');

export default ({ route }) => {
	const [details, setDetails] = useState({});
	const { createdAt, data } = details;

	useEffect(() => {
		const getNameAsyncStorage = async () => {
			const getData = JSON.parse(await AsyncStorage.getItem('userData')).history;
			// const keys = Object.keys(getData);
			// const position = keys.findIndex((data) => data === route.params.details.uid);
			// const data = getData[position];
			// console.log(data);
			filter(getData, route.params.details.uid);
		};
		getNameAsyncStorage();
	}, []);
	return (
		<Block flex center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Block flex style={styles.group}>
					{/* <Block row space='between' style={{ marginBottom: 10 }}>
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
					</Block> */}

					{/* <Block card flex style={styles.card}>
						<Block flex space='between' style={styles.cardDescription}>
							<Text size={12} style={styles.cardTitle}>
								{dayjs(data.createdAt).format('MMMM DD, YYYY  hh:mm A')}
							</Text>
							<Text size={14} style={styles.text} bold>
								Number of Correct Answers:
								{data.createdAt}
							</Text>
							<Text size={14} style={styles.text} bold>
								Number of Questions:
								{data.total}
							</Text>
						</Block>
					</Block> */}
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
	cardDescription: {
		padding: theme.SIZES.BASE,
	},
	text: { marginBottom: 10, flex: 1, flexWrap: 'wrap', color: argonTheme.COLORS.BALCK },
});
