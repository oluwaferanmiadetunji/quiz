import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import styles from './style';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { BLACK, BLUE, GRAY } from '../../components/Color';
import { Input, Block, Text } from 'galio-framework';
import { makePostReq } from '../../utils/api';
import show from '../../utils/showMessage';
const { height, width } = Dimensions.get('window');
import { _retrieveData, _storeData } from '../../utils/storage';

export default () => {
	const [count, setCount] = useState('');
	const [duration, setDuration] = useState('');
	const [name, setName] = useState('');

	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		const { status, message, data } = await makePostReq('user/update', { name: name.trim(), count: parseInt(count), duration: parseInt(duration) });
		if (status === 'ok') {
			show(message, 'success');
			setLoading(false);
			await _storeData('User', JSON.stringify(data.user));
		} else {
			show(message, 'danger');
			setLoading(false);
		}
	};

	const disabled = (count.trim() === '') | (duration.trim() === '') | (name.trim() === '');

	const disabledClass = () => {
		return disabled ? GRAY : BLUE;
	};

	useEffect(() => {
		const getData = async () => {
			const data = JSON.parse(await _retrieveData('User'));
			setName(data.name);
			setCount(`${data.count}`);
			setDuration(`${data.duration}`);
		};
		getData();
	}, []);

	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.05 }}>
			<CustomText style={{ fontSize: 25, fontWeight: 'bold', color: BLACK }}>Update Profile!</CustomText>
			<Block style={{ width: width * 0.8, marginTop: height * 0.03 }}>
				<Text muted>Full Name</Text>
				<Input
					placeholder='Full Name'
					placeholderTextColor={BLACK}
					onChangeText={(text) => setName(text)}
					value={name}
					type='default'
					color={BLACK}
				/>
				<Text muted style={{ marginTop: 10 }}>
					Exam Count
				</Text>
				<Input
					placeholder='Exam Count'
					placeholderTextColor={BLACK}
					onChangeText={(text) => setCount(text)}
					value={count}
					type='number-pad'
					color={BLACK}
				/>
				<Text muted style={{ marginTop: 10 }}>
					Exam Duration
				</Text>
				<Input
					placeholder='Exam Duration (minutes)'
					placeholderTextColor={BLACK}
					onChangeText={(text) => setDuration(text)}
					value={duration}
					type='number-pad'
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
						Update
					</CustomButton>
				)}
			</Block>
		</SafeAreaView>
	);
};
