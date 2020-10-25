import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Block, Text } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, argonTheme } from '../constants';
import { forgotPassword } from '../api/userApi';
import show from '../components/showMessage';

const { width, height } = Dimensions.get('screen');

export default ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (email.trim() === '') {
			show('Email can not be empty', 'warning');
		} else {
			setLoading(true);
			const { message, status } = await forgotPassword(email).trim();
			console.log(message, status);
			if (status === 'error') {
				show(message, 'danger');
			} else {
				show(message, 'success');
			}
			setLoading(false);
		}
	};

	return (
		<Block flex middle>
			<StatusBar hidden />
			<ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }}>
				<Block flex middle>
					<Block style={styles.registerContainer}>
						<Block flex>
							<Block flex={0.17} middle>
								<Text color={argonTheme.COLORS.PRIMARY} size={18}>
									Change Password!
								</Text>
							</Block>
							<Block flex center>
								<KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled>
									<Block width={width * 0.8} style={{ marginBottom: 15 }}>
										<Input
											borderless
											email
											placeholder='Email'
											iconContent={
												<Icon size={16} color={argonTheme.COLORS.ICON} name='ic_mail_24px' family='ArgonExtra' style={styles.inputIcons} />
											}
											value={email}
											onChangeText={(val) => setEmail(val)}
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

									<Block style={{ marginTop: 20 }}>
										<Text color={argonTheme.COLORS.PRIMARY} size={18} onPress={() => navigation.navigate('Login')}>
											Already have an account?
										</Text>
									</Block>
									<Block style={{ marginTop: 20 }}>
										<Text color={argonTheme.COLORS.PRIMARY} size={18} onPress={() => navigation.navigate('Register')}>
											Don't have an account?
										</Text>
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
