import React, {useState} from 'react';
import {StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView} from 'react-native';
import {Block, Text} from 'galio-framework';

import {Button, Icon, Input} from '../components';
import {Images, argonTheme} from '../constants';
import {registerUser} from '../api/userApi';

const {width, height} = Dimensions.get('screen');

export default ({navigation}) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
	};

	return (
		<Block flex middle>
			<StatusBar hidden />
			<ImageBackground source={Images.RegisterBackground} style={{width, height, zIndex: 1}}>
				<Block flex middle>
					<Block style={styles.registerContainer}>
						<Block flex>
							<Block flex={0.17} middle>
								<Text color={argonTheme.COLORS.PRIMARY} size={18}>
									Create An Account!
								</Text>
							</Block>
							<Block flex center>
								<KeyboardAvoidingView style={{flex: 1}} behavior='padding' enabled>
									<Block width={width * 0.8} style={{marginBottom: 15}}>
										<Input
											borderless
											placeholder='Name'
											iconContent={
												<Icon
													size={16}
													color={argonTheme.COLORS.ICON}
													name='hat-3'
													family='ArgonExtra'
													style={styles.inputIcons}
												/>
											}
											value={name}
											onChangeText={(val) => setName(val)}
										/>
									</Block>
									<Block width={width * 0.8} style={{marginBottom: 15}}>
										<Input
											borderless
											placeholder='Email'
											iconContent={
												<Icon
													size={16}
													color={argonTheme.COLORS.ICON}
													name='ic_mail_24px'
													family='ArgonExtra'
													style={styles.inputIcons}
												/>
											}
											value={email}
											onChangeText={(val) => setEmail(val)}
										/>
									</Block>
									<Block width={width * 0.8}>
										<Input
											password
											borderless
											placeholder='Password'
											iconContent={
												<Icon
													size={16}
													color={argonTheme.COLORS.ICON}
													name='padlock-unlocked'
													family='ArgonExtra'
													style={styles.inputIcons}
												/>
											}
											value={password}
											onChangeText={(val) => setPassword(val)}
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

									<Block style={{marginTop: 10}}>
										<Text
											color={argonTheme.COLORS.PRIMARY}
											size={18}
											onPress={() => navigation.navigate('Login')}
										>
											Already have an Account!
										</Text>
									</Block>
									<Block style={{marginTop: 10}}>
										<Text
											color={argonTheme.COLORS.PRIMARY}
											size={18}
											onPress={() => navigation.navigate('ForgotPassword')}
										>
											Forgot Pasword?
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
