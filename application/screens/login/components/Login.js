import React, { useState } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import styles from './style';
import CustomButton from '../../../components/Button';
import CustomText from '../../../components/Text';
import { BLACK, GREEN, GRAY, BLUE } from '../../../components/Color';
import { Input, Block } from 'galio-framework';
import { makePostReq, makeGetReq } from '../../../utils/api';
import show from '../../../utils/showMessage';
import { isLogged } from '../redux';
import { useDispatch } from 'react-redux';
import { _storeData } from '../../../utils/storage';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const disabled = (email.trim() === '') | (password.trim() === '');

	const disabledClass = () => {
		return disabled ? GRAY : BLUE;
	};

	const handleSubmit = async () => {
		setLoading(true);
		const { status, message, data } = await makePostReq('user/login', { email: email.trim(), password: password.trim() });

		if (status === 'ok') {
			show(message, 'success');
			await _storeData('Token', data.token);
			await _storeData('User', JSON.stringify(data.user));
			dispatch(isLogged(true));
		} else {
			show(message, 'danger');
			dispatch(isLogged(false));
		}
		setLoading(false);
	};

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.1 }}>
			<CustomText style={{ fontSize: 25, fontWeight: 'bold', color: BLACK }}>Welcome back!</CustomText>
			<Block style={{ width: width * 0.8, marginTop: height * 0.05 }}>
				<Input
					placeholder='Email Address'
					placeholderTextColor={BLACK}
					onChangeText={(text) => setEmail(text)}
					value={email}
					type='email-address'
					color={BLACK}
					style={{ fontSize: 20 }}
				/>

				<Input placeholder='Password' placeholderTextColor={BLACK} password viewPass onChangeText={(text) => setPassword(text)} value={password} />
				{!loading && (
					<CustomButton
						textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}
						style={{ marginTop: 30, backgroundColor: disabledClass() }}
						onPress={disabled ? null : handleSubmit}>
						Login
					</CustomButton>
				)}

				{loading && (
					<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30, backgroundColor: GRAY }}>
						Connecting...
					</CustomButton>
				)}
			</Block>
			<View style={{ marginTop: 30, flex: 1, flexDirection: 'row' }}>
				<CustomText style={{ fontSize: 16, marginLeft: 5, color: GREEN, fontWeight: 'bold' }} onPress={() => navigation.navigate('ForgotPassword')}>
					Change Password
				</CustomText>
			</View>
		</SafeAreaView>
	);
};
