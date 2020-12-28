import React, { useState } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { BLACK, BLUE, GRAY } from '../../components/Color';
import { Input, Block } from 'galio-framework';
import { makePostReq } from '../../utils/api';
import show from '../../utils/showMessage';

const { height, width } = Dimensions.get('window');

export default ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password1, setPassword1] = useState('');
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	const disabled = (name.trim() === '') | (email.trim() === '') | (password1.trim() === '') | (password.trim() === '');

	const disabledClass = () => {
		return disabled ? GRAY : BLUE;
	};

	const handleSubmit = async () => {
		if (!email.trim().match(re)) {
			show('Please, enter a valid email address', 'warning');
		} else if (password.trim().length < 6) {
			show('Password must be at least 6 characters', 'warning');
		} else if (password.trim() !== password1.trim()) {
			show('Passwords must be the same', 'warning');
		} else {
			setLoading(true);
			const { status, message } = await makePostReq('user/register', { name: name.trim(), email: email.trim(), password: password.trim() });

			if (status === 'ok') {
				show(message, 'success');
				navigation.navigate('Login');
			} else {
				show(message, 'danger');
			}
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.1 }}>
			<CustomText style={{ fontSize: 25, fontWeight: 'bold', color: BLACK }}>Create An Account!</CustomText>
			<Block style={{ width: width * 0.8, marginTop: height * 0.05 }}>
				<Input
					placeholder='Full Name'
					placeholderTextColor={BLACK}
					onChangeText={(text) => setName(text)}
					value={name}
					type='default'
					color={BLACK}
					style={{ fontSize: 20 }}
				/>
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

				<Input
					placeholder='Confirm Password'
					placeholderTextColor={BLACK}
					password
					viewPass
					onChangeText={(text) => setPassword1(text)}
					value={password1}
				/>
				{!loading && (
					<CustomButton
						textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}
						style={{ marginTop: 30, backgroundColor: disabledClass() }}
						onPress={disabled ? null : handleSubmit}>
						Signup
					</CustomButton>
				)}

				{loading && (
					<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30, backgroundColor: GRAY }}>
						Connecting...
					</CustomButton>
				)}
			</Block>
			<View style={{ marginTop: 30, flex: 1, flexDirection: 'row' }}>
				<CustomText style={{ fontSize: 16, marginLeft: 5, color: BLUE, fontWeight: 'bold' }} onPress={() => navigation.navigate('ForgotPassword')}>
					Change Password
				</CustomText>
			</View>
		</SafeAreaView>
	);
};
