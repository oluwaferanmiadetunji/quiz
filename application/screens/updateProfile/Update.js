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
import { useSelector, useDispatch } from 'react-redux';
import { editDetails } from '../../redux/user';

export default () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [count, setCount] = useState(`${user.count}`);
	const [duration, setDuration] = useState(`${user.duration}`);
	const [name, setName] = useState(user.name);

	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (parseInt(count) > 50) {
			show('The maximum number of questions you can attempt is 50', 'warning');
		} else {
			setLoading(true);
			const { status, message } = await makePostReq('user/update', { name: name.trim(), count: parseInt(count), duration: parseInt(duration) });
			if (status === 'ok') {
				show(message, 'success');
				setLoading(false);
				dispatch(editDetails({ count, duration, name }));
			} else {
				show(message, 'danger');
				setLoading(false);
			}
		}
	};

	const disabled = (count === '') | (duration === '') | (name.trim() === '');

	const disabledClass = () => {
		return disabled ? GRAY : BLUE;
	};

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
