import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, AsyncStorage } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import dayjs from 'dayjs';
import { Images, argonTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { Button } from '../components';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default ({ navigation }) => {
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		const getNameAsyncStorage = async () => {
			const getData = await AsyncStorage.getItem('userData');
			setUserData(JSON.parse(getData));
		};
		getNameAsyncStorage();
	}, [userData]);

	return (
		<Block flex style={styles.profile}>
			<Block flex>
				<ImageBackground source={Images.ProfileBackground} style={styles.profileContainer} imageStyle={styles.profileBackground}>
					<ScrollView showsVerticalScrollIndicator={false} style={{ width, marginTop: '35%' }}>
						<Block flex style={styles.profileCard}>
							<Block middle style={styles.avatarContainer}>
								<Image source={{ uri: Images.ProfilePicture }} style={styles.avatar} />
							</Block>

							<Block flex>
								<Block middle style={styles.nameInfo}>
									<Text bold size={28} color='#32325D'>
										{userData ? userData.name : null}
									</Text>
									<Text size={16} color='#32325D' style={{ marginTop: 10 }}>
										{userData ? userData.email : null}
									</Text>
								</Block>
								<Block middle style={{ marginTop: 30, marginBottom: 16 }}>
									<Block style={styles.divider} />
								</Block>
								<Block style={styles.info}>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Exam Duration:
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? userData.duration : null} minutes
											</Text>
										</Block>
									</Block>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Exam Count:
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? userData.count : null}
											</Text>
										</Block>
									</Block>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Plan:
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? userData.status : null}
											</Text>
										</Block>
									</Block>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Joined on:
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? dayjs(userData.createdAt).format('MMM DD, YYYY h:mm a') : new Date().toTimeString()}
											</Text>
										</Block>
									</Block>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Number of Correct Questions
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? userData.correct : null}
											</Text>
										</Block>
									</Block>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Total Number of Questions:
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? userData.total : null}
											</Text>
										</Block>
									</Block>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Number of Attempts:
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? userData.times : null}
											</Text>
										</Block>
									</Block>
									<Block row space='between' style={{ marginBottom: 20 }}>
										<Block middle>
											<Text bold color={argonTheme.COLORS.MUTED} size={16} style={{ marginBottom: 10 }}>
												Success Rate:
											</Text>
										</Block>
										<Block middle>
											<Text bold color={argonTheme.COLORS.BLACK} size={16} style={{ marginBottom: 10 }}>
												{userData ? `${((userData.correct / userData.total) * 100).toFixed(2)} %` : null}
											</Text>
										</Block>
									</Block>
								</Block>
								<Block middle>
									<Button color='secondary' style={styles.createButton} onPress={() => navigation.navigate('Update')}>
										<Text bold size={14} color={argonTheme.COLORS.PRIMARY}>
											Update Profile
										</Text>
									</Button>
								</Block>
								<Block middle>
									<Button color='secondary' style={styles.createButton} onPress={() => navigation.navigate('Update')}>
										<Text bold size={14} color={argonTheme.COLORS.PRIMARY}>
											Upgrade Plan
										</Text>
									</Button>
								</Block>
							</Block>
						</Block>
					</ScrollView>
				</ImageBackground>
			</Block>
		</Block>
	);
};

const styles = StyleSheet.create({
	profile: {
		marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
		flex: 1,
	},
	profileContainer: {
		width: width,
		height: height,
		padding: 0,
		zIndex: 1,
	},
	profileBackground: {
		width: width,
		height: height / 2,
	},
	profileCard: {
		// position: "relative",
		padding: theme.SIZES.BASE,
		marginHorizontal: theme.SIZES.BASE,
		marginTop: 65,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
		backgroundColor: theme.COLORS.WHITE,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 8,
		shadowOpacity: 0.2,
		zIndex: 2,
	},
	info: {
		paddingHorizontal: 40,
	},
	avatarContainer: {
		position: 'relative',
		marginTop: -80,
	},
	avatar: {
		width: 124,
		height: 124,
		borderRadius: 62,
		borderWidth: 0,
	},
	nameInfo: {
		marginTop: 35,
	},
	divider: {
		width: '90%',
		borderWidth: 1,
		borderColor: '#E9ECEF',
	},
	thumb: {
		borderRadius: 4,
		marginVertical: 4,
		alignSelf: 'center',
		width: thumbMeasure,
		height: thumbMeasure,
	},
	createButton: {
		width: width * 0.5,
		marginTop: 25,
		borderRadius: 7,
	},
});
