import React from 'react';
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Header } from '../components';

const HomeStack = () => {
	return (
		<Stack.Navigator mode='card' headerMode='screen'>
			<Stack.Screen
				name='Home'
				component={Home}
				options={{
					header: ({ navigation, scene }) => <Header title='Home' navigation={navigation} scene={scene} />,
					cardStyle: { backgroundColor: '#F8F9FE' },
				}}
			/>
			{/* <Stack.Screen
				name='Pro'
				component={Pro}
				options={{
					header: ({ navigation, scene }) => <Header title='' back white transparent navigation={navigation} scene={scene} />,
					headerTransparent: true,
				}}
			/> */}
		</Stack.Navigator>
	);
};

export default HomeStack;
