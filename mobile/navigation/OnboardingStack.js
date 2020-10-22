import React from 'react';
import Onboarding from '../screens/Onboarding';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const OnboardingStack = () => {
	return (
		<Stack.Navigator mode='card' headerMode='none'>
			<Stack.Screen
				name='Onboarding'
				component={Onboarding}
				option={{
					headerTransparent: true,
				}}
			/>
		</Stack.Navigator>
	);
};

export default OnboardingStack;
