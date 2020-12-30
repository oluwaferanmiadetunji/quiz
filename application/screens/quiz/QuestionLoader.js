import React from 'react';
import { Dimensions, SafeAreaView, Text } from 'react-native';
import { Block } from 'galio-framework';
import styles from './style';

const { height, width } = Dimensions.get('window');

export default () => {
	return (
		<SafeAreaView style={{ ...styles.container, paddingTop: height * 0.5 }}>
			<Block style={{ width: width, marginBottom: 0, justifyContent: 'center' }}>
				<Text muted style={{ textAlign: 'center', fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
					Preparing Questions...
				</Text>
			</Block>
		</SafeAreaView>
	);
};
