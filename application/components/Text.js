import React from 'react';
import { Text } from 'react-native';

export default (props) => {
	return (
		<Text style={{ fontFamily: 'Roboto', ...props.style }} onPress={props.onPress}>
			{props.children}
		</Text>
	);
};
