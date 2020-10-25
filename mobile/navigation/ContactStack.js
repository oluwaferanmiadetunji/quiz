import React from 'react';
import Contact from '../screens/Contact';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Header } from '../components';

export default () => {
	return (
		<Stack.Navigator mode='card' headerMode='screen'>
			<Stack.Screen
				name='Contact Us'
				component={Contact}
				options={{
					header: ({ navigation, scene }) => <Header title='Contact' navigation={navigation} scene={scene} />,
					cardStyle: { backgroundColor: '#F8F9FE' },
				}}
			/>
		</Stack.Navigator>
	);
};
