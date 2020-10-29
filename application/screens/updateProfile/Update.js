import React, { useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { BLACK, BLUE, GRAY } from '../../components/Color';
import { Input, Block, Text } from 'galio-framework';
import { makePostReq } from '../../utils/api';
import show from '../../utils/showMessage';
const { height, width } = Dimensions.get('window');

export default () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		const { status, message } = await makePostReq('reset', { email: email.trim() });
		if (status === 'ok') {
			show(message, 'success');
		} else {
			show(message, 'danger');
		}
		setLoading(false);
	};

	const disabled = email.trim() === '';

	const disabledClass = () => {
		return disabled ? GRAY : BLUE;
	};

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.1 }}>
			<CustomText style={{ fontSize: 25, fontWeight: 'bold', color: BLACK }}>Update Profile!</CustomText>
			<Block style={{ width: width * 0.8, marginTop: height * 0.03 }}>
				<Text style={{ fontSize: 16, textAlign: 'center', color: BLACK, marginBottom: 20 }}>Type in the email address linked to your account</Text>
				<Input
					placeholder='Email Address'
					placeholderTextColor={BLACK}
					onChangeText={(text) => setEmail(text)}
					value={email}
					type='email-address'
					color={BLACK}
				/>

				{loading && (
					<CustomButton textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }} style={{ marginTop: 30, backgroundColor: GRAY }}>
						Connecting...
					</CustomButton>
				)}
				{!loading && (
					<CustomButton
						textStyling={{ width: width * 0.7, textAlign: 'center', fontSize: 16 }}
						style={{ marginTop: 30, backgroundColor: disabledClass() }}
						onPress={disabled ? null : handleSubmit}>
						Reset
					</CustomButton>
				)}
			</Block>
		</SafeAreaView>
	);
};
