import React, { useEffect, useState } from 'react';
import { View, Dimensions, SafeAreaView, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import { Card } from 'react-native-elements';
import { _retrieveData } from '../../utils/storage';
import dayjs from 'dayjs';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const data = JSON.parse(await _retrieveData('User'));
			setData(data.history);
		};
		getData();
	}, []);

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.01 }}>
			<ScrollView style={styles.scrollView}>
				{data.map(({ data }, index) => (
					<TouchableWithoutFeedback onPress={() => navigation.navigate('SingleHistory', { details: data })} key={index}>
						<Card>
							<View style={{ width: width * 0.8 }}>
								<Text muted>{dayjs(data.createdAt).format('MMM DD, YYYY h:mm a')}</Text>
								<Text style={styles.text}>Number of Correct Answers: {data.data.correct}</Text>
								<Text style={styles.text}>Number of Questions: {data.data.total}</Text>
							</View>
						</Card>
					</TouchableWithoutFeedback>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};
