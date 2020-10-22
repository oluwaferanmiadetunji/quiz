import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';
//argon
import { argonTheme } from '../constants/';
import compareValues from '../components/sortData';
import dayjs from 'dayjs';

const { width } = Dimensions.get('screen');

export default ({ navigation }) => {
	const [details, setDetails] = useState('');

	useEffect(() => {
		const getNameAsyncStorage = async () => {
			const getData = await AsyncStorage.getItem('userData');
			const uData = JSON.parse(getData);
			const historyObject = uData.history;
			if (historyObject) {
				const historyArray = Object.keys(historyObject)
					.map((key) => ({
						...historyObject[key],
						uid: key,
					}))
					.sort(compareValues('createdAt', 'desc'));
				setDetails(historyArray);
			}
		};
		getNameAsyncStorage();
	}, []);

	return (
		<Block flex center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Block flex style={styles.group}>
					{details.length > 0
						? details.map((detail, index) => (
								<Block card flex style={styles.card} key={index}>
									{/* <TouchableWithoutFeedback onPress={() => navigation.navigate('SingleHistory', { details: detail })}> */}
									<Block flex space='between' style={styles.cardDescription}>
										<Text size={14} style={styles.cardTitle}>
											{dayjs(detail.createdAt).format('MMMM DD, YYYY  hh:mm A')}
										</Text>
										<Text size={16} style={styles.text} bold>
											Number of Correct Answers: {detail.data.correct}
										</Text>
										<Text size={16} style={styles.text} bold>
											Number of Questions: {detail.data.total}
										</Text>
										<Text size={16} style={styles.nav}>
											View
										</Text>
									</Block>
									{/* </TouchableWithoutFeedback> */}
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
	cardDescription: {
		padding: theme.SIZES.BASE,
	},
	text: { marginBottom: 10, flex: 1, flexWrap: 'wrap', color: argonTheme.COLORS.BALCK },
	nav: { marginBottom: 10, flex: 1, flexWrap: 'wrap', color: argonTheme.COLORS.PRIMARY },
});
