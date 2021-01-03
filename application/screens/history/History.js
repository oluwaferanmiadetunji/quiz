import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Dimensions, SafeAreaView, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import { Card } from 'react-native-elements';
import { _retrieveData } from '../../utils/storage';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { makeGetReq } from '../../utils/api';
import { setDetails } from '../../redux/user';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const dispatch = useDispatch();

	const { history } = useSelector((state) => state.user);

	const navigate = (data) => {
		navigation.navigate('SingleHistory', { details: data });
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const { data } = await makeGetReq('user');
			dispatch(setDetails(data));
		};

		getUserDetails();
	}, []);

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.01 }}>
			<ScrollView style={styles.scrollView}>
				{history.map((data) => (
					<TouchableWithoutFeedback onPress={() => navigate(data)} key={data.id}>
						<Card>
							<View style={{ width: width * 0.8 }}>
								<Text muted>{dayjs(data.createdAt).format('MMM DD, YYYY h:mm a')}</Text>
								<Text style={styles.text}>Number of Correct Answers: {data.correct}</Text>
								<Text style={styles.text}>Number of Questions: {data.total}</Text>
							</View>
						</Card>
					</TouchableWithoutFeedback>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};
