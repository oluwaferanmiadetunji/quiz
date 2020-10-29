import React, { useEffect, useState } from 'react';
import { View, Dimensions, SafeAreaView, Text, Image, ScrollView } from 'react-native';
import styles from './style';
import { RED } from '../../components/Color';
import { Card } from 'react-native-elements';
import { _retrieveData } from '../../utils/storage';
import CustomButton from '../../components/Button';
import dayjs from 'dayjs';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const getData = async () => {
			const data = JSON.parse(await _retrieveData('User'));
			setUser(data);
		};
		getData();
	}, [user]);

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.01 }}>
			<View>
				<Image style={{ width: 100, height: 100 }} source={require('../../assets/avatar.png')} />
			</View>
			<View style={{ marginTop: 10, marginBottom: 10 }}>
				<Text style={styles.text}>{user.name}</Text>
			</View>
			{user.status === 'Free' && (
				<View style={{ marginTop: 10, marginBottom: 20 }}>
					<Text muted style={{ textAlign: 'center' }}>
						Your account is limited to only free questions
					</Text>
					<CustomButton
						textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}
						style={{ marginTop: 10, backgroundColor: RED, marginBottom: 10 }}>
						Update Account
					</CustomButton>
				</View>
			)}
			<ScrollView style={styles.scrollView}>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{user.email}</Text>
						<Text muted>Email Address</Text>
					</View>
				</Card>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{user.status}</Text>
						<Text muted>Plan </Text>
					</View>
				</Card>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{user.count}</Text>
						<Text muted>Exam Count</Text>
					</View>
				</Card>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{user.duration}</Text>
						<Text muted>Exam Duration (minutes)</Text>
					</View>
				</Card>

				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{user.correct}</Text>
						<Text muted>Number of Correct Questions</Text>
					</View>
				</Card>

				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{user.total}</Text>
						<Text muted>Total Number of Questions</Text>
					</View>
				</Card>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{user.times}</Text>
						<Text muted>Number of Attempts</Text>
					</View>
				</Card>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{`${((user.correct / user.total) * 100).toFixed(2)} %`}</Text>
						<Text muted>Success Rate</Text>
					</View>
				</Card>
				<Card>
					<View style={{ width: width * 0.8 }}>
						<Text style={styles.text}>{dayjs(user.createdAt).format('MMM DD, YYYY h:mm a')}</Text>
						<Text muted>Account created on</Text>
					</View>
				</Card>
			</ScrollView>
		</SafeAreaView>
	);
};
