import React from 'react';
import { View, Dimensions, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { RED, BLACK } from '../../components/Color';
import { Card } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { isLogged } from '../../redux/login';
import { FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const dispatch = useDispatch();

	const handlePress = (route) => {
		navigation.navigate(route);
	};

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.02 }}>
			<View style={{ marginTop: 20 }}>
				<TouchableOpacity onPress={() => handlePress('Quiz')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='rocket' size={24} color={BLACK} />
							<Text style={styles.text}>Take Quiz</Text>
							<View style={{ marginLeft: width * 0.45 }}>
								<AntDesign name='right' size={24} color={BLACK} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handlePress('Profile')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='user' size={24} color={BLACK} />
							<Text style={styles.text}>User Profile</Text>
							<View style={{ marginLeft: width * 0.42 }}>
								<AntDesign name='right' size={24} color={BLACK} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handlePress('Update')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='edit' size={24} color={BLACK} />
							<Text style={styles.text}>Update Profile</Text>
							<View style={{ marginLeft: width * 0.36 }}>
								<AntDesign name='right' size={24} color={BLACK} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handlePress('History')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<FontAwesome name='history' size={24} color={BLACK} />
							<Text style={styles.text}>History</Text>
							<View style={{ marginLeft: width * 0.5 }}>
								<AntDesign name='right' size={24} color={BLACK} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handlePress('Contact')}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='new-message' size={24} color={BLACK} />
							<Text style={styles.text}>Contact Us</Text>
							<View style={{ marginLeft: width * 0.42 }}>
								<AntDesign name='right' size={24} color={BLACK} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => dispatch(isLogged(false))}>
					<Card>
						<View style={{ width: width * 0.8, flexDirection: 'row' }}>
							<Entypo name='login' size={24} color={RED} />
							<Text style={{ ...styles.text, color: RED }}>Signout</Text>
							<View style={{ marginLeft: width * 0.48 }}>
								<AntDesign name='right' size={24} color={RED} />
							</View>
						</View>
					</Card>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
