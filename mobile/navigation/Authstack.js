import React from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Authtack = () => {
	return (
		<Stack.Navigator mode='card' headerMode='none'>
			<Stack.Screen name='Login' component={Login} />
			<Stack.Screen name='Register' component={Register} />
			<Stack.Screen name='ForgotPassword' component={ForgotPassword} />
		</Stack.Navigator>
	);
};

export default Authtack;
