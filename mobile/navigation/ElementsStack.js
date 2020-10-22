import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Elements from '../screens/Elements';
import Pro from '../screens/Pro';
import {Header} from '../components';

const Stack = createStackNavigator();

const ElementsStack = () => {
	return (
		<Stack.Navigator mode='card' headerMode='screen'>
			<Stack.Screen
				name='Elements'
				component={Elements}
				options={{
					header: ({navigation, scene}) => <Header title='Elements' navigation={navigation} scene={scene} />,
					cardStyle: {backgroundColor: '#F8F9FE'},
				}}
			/>
			<Stack.Screen
				name='Pro'
				component={Pro}
				options={{
					header: ({navigation, scene}) => (
						<Header title='' back white transparent navigation={navigation} scene={scene} />
					),
					headerTransparent: true,
				}}
			/>
		</Stack.Navigator>
	);
};

export default ElementsStack;
