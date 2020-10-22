import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Block, Text } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, argonTheme } from '../constants';
import show from '../components/showMessage';
import { requestUpdate, getData } from '../api/userApi';

const { width, height } = Dimensions.get('screen');

export default ({ navigation }) => {
	const [name, setName] = useState('');
	const [count, setCount] = useState('');
	const [duration, setDuration] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (name === '') {
			show('Name can not be empty', 'danger');
		} else if (duration === '') {
			show('Exam duration can not be empty', 'danger');
		} else if (duration > 60) {
			show('Exam duration can not be more than 60 minutes', 'danger');
		} else if (count === '') {
			show('Exam count can not be empty', 'danger');
		} else if (count > 100) {
			show('Exam count can not be more than 100', 'danger');
		} else {
			setLoading(true);
			const response = await requestUpdate({ name, count, duration });
			response.status === 'ok' ? show(response.message, 'success') : show(response.message, 'danger');
			setLoading(false);
			try {
				const userData = await getData();
				await AsyncStorage.setItem('userData', JSON.stringify(userData));
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		const getNameAsyncStorage = async () => {
			const getName = await AsyncStorage.getItem('name');
			const getData = await AsyncStorage.getItem('userData');
			const uData = JSON.parse(getData);
			setName(getName);
			setCount(uData.count);
			setDuration(uData.duration);
		};
		getNameAsyncStorage();
	}, []);

	return (
		<Block flex middle>
			<StatusBar hidden />
			<ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }}>
				<Block flex middle>
					<Block style={styles.registerContainer}>
						<Block flex>
							<Block flex={0.17} middle>
								<Text color={argonTheme.COLORS.PRIMARY} size={18}>
									Update your account!
								</Text>
							</Block>
							<Block flex center>
								<KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled>
									<Block>
										<Text bold color='#525F7F' size={16} style={{ marginTop: 10 }}>
											Name
										</Text>
									</Block>
									<Block width={width * 0.8}>
										<Input
											text
											borderless
											placeholder='Name'
											iconContent={<Icon size={16} color={argonTheme.COLORS.ICON} name='pin-3' family='Galio' style={styles.inputIcons} />}
											value={name}
											onChangeText={(val) => setName(val)}
										/>
									</Block>
									<Block>
										<Text bold color='#525F7F' size={16} style={{ marginTop: 10 }}>
											Exam Count
										</Text>
									</Block>
									<Block width={width * 0.8}>
										<Input
											text
											borderless
											placeholder='Exam Count'
											iconContent={<Icon size={16} color={argonTheme.COLORS.ICON} name='pin-3' family='Galio' style={styles.inputIcons} />}
											value={count}
											onChangeText={(val) => setCount(val)}
										/>
									</Block>
									<Block>
										<Text bold color='#525F7F' size={16} style={{ marginTop: 10 }}>
											Exam Duration (minutes)
										</Text>
									</Block>
									<Block width={width * 0.8}>
										<Input
											text
											borderless
											placeholder='Exam Duration'
											iconContent={<Icon size={16} color={argonTheme.COLORS.ICON} name='pin-3' family='Galio' style={styles.inputIcons} />}
											value={duration}
											onChangeText={(val) => setDuration(val)}
										/>
									</Block>
									{loading && (
										<Block middle>
											<Button color='primary' style={styles.createButton}>
												<Text bold size={14} color={argonTheme.COLORS.WHITE}>
													Connecting...
												</Text>
											</Button>
										</Block>
									)}
									{!loading && (
										<Block middle>
											<Button color='primary' style={styles.createButton} onPress={handleSubmit}>
												<Text bold size={14} color={argonTheme.COLORS.WHITE}>
													Submit
												</Text>
											</Button>
										</Block>
									)}

									<Block middle>
										<Button color='secondary' style={styles.createButton} onPress={() => navigation.navigate('Profile')}>
											<Text bold size={14} color={argonTheme.COLORS.PRIMARY}>
												Profile
											</Text>
										</Button>
									</Block>
								</KeyboardAvoidingView>
							</Block>
						</Block>
					</Block>
				</Block>
			</ImageBackground>
		</Block>
	);
};

const styles = StyleSheet.create({
	registerContainer: {
		width: width * 0.9,
		height: height * 0.78,
		backgroundColor: '#F4F5F7',
		borderRadius: 4,
		shadowColor: argonTheme.COLORS.BLACK,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 8,
		shadowOpacity: 0.1,
		elevation: 1,
		overflow: 'hidden',
	},
	socialConnect: {
		backgroundColor: argonTheme.COLORS.WHITE,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#8898AA',
	},
	socialButtons: {
		width: 120,
		height: 40,
		backgroundColor: '#fff',
		shadowColor: argonTheme.COLORS.BLACK,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 8,
		shadowOpacity: 0.1,
		elevation: 1,
	},
	socialTextButtons: {
		color: argonTheme.COLORS.PRIMARY,
		fontWeight: '800',
		fontSize: 14,
	},
	inputIcons: {
		marginRight: 12,
	},
	passwordCheck: {
		paddingLeft: 15,
		paddingTop: 13,
		paddingBottom: 30,
	},
	createButton: {
		width: width * 0.5,
		marginTop: 25,
		borderRadius: 7,
	},
});
