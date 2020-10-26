import React from 'react';
import Profile from '../screens/Profile';
import Update from '../screens/Update';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../components';

const Stack = createStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator initialRouteName='Profile' mode='card' headerMode='screen'>
			<Stack.Screen
				name='Profile'
				component={Profile}
				options={{
					header: ({ navigation, scene }) => <Header transparent white title='Profile' navigation={navigation} scene={scene} />,
					cardStyle: { backgroundColor: '#FFFFFF' },
					headerTransparent: true,
				}}
			/>

			<Stack.Screen
				name='Update'
				component={Update}
				options={{
					header: ({ navigation, scene }) => <Header title='' back white transparent navigation={navigation} scene={scene} />,
					headerTransparent: true,
				}}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStack;
