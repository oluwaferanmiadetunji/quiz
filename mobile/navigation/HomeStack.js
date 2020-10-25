import React from 'react';
import Home from '../screens/Home';
import Quiz from '../screens/Quiz';
import Summary from '../screens/Summary';
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
			<Stack.Screen
				name='Quiz'
				component={Quiz}
				options={{
					header: ({ navigation, scene }) => <Header transparent white navigation={navigation} scene={scene} />,
					cardStyle: { backgroundColor: '#FFFFFF' },
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name='Summary'
				component={Summary}
				options={{
					header: ({ navigation, scene }) => <Header title='' navigation={navigation} scene={scene} />,
					headerTransparent: true,
				}}
			/>
		</Stack.Navigator>
	);
};

export default HomeStack;
