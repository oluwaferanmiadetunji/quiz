import React from 'react';
import { View, Dimensions, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { RED, BLACK, BLUE } from '../../components/Color';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { isLogged } from '../login/redux';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const dispatch = useDispatch();

	const handlePress = (route) => {
		navigation.navigate(route);
	};
	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.02 }}>
			<CustomText style={styles.title}>Home</CustomText>
			<View style={{ marginTop: 20 }}>
				<TouchableOpacity onPress={() => handlePress('Quiz')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='rocket' size={24} color={BLUE} />
							<Text style={styles.text}>Take Quiz</Text>
							<View style={{ marginLeft: width * 0.45 }}>
								<AntDesign name='right' size={24} color={BLUE} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handlePress('Profile')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='rocket' size={24} color={BLUE} />
							<Text style={styles.text}>User Profile</Text>
							<View style={{ marginLeft: width * 0.42 }}>
								<AntDesign name='right' size={24} color={BLUE} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handlePress('Update')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='rocket' size={24} color={BLUE} />
							<Text style={styles.text}>Update Profile</Text>
							<View style={{ marginLeft: width * 0.38 }}>
								<AntDesign name='right' size={24} color={BLUE} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handlePress('History')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='rocket' size={24} color={BLUE} />
							<Text style={styles.text}>History</Text>
							<View style={{ marginLeft: width * 0.5 }}>
								<AntDesign name='right' size={24} color={BLUE} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => dispatch(isLogged(false))}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='login' size={24} color={RED} />
							<Text style={{ ...styles.text, color: RED }}>Signout</Text>
							<View style={{ marginLeft: width * 0.49 }}>
								<AntDesign name='right' size={24} color={RED} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
