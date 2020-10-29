import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BLUE, WHITE } from './Color';
import CustomText from './Text';

export default (props) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={{ ...styles.button, ...props.style }}>
				<CustomText style={{ ...styles.buttonText, ...props.textStyling }}>{props.children}</CustomText>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: BLUE,
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 5,
	},
	buttonText: {
		color: WHITE,
		fontSize: 18,
		paddingBottom: 5,
		paddingTop: 5,
	},
});
