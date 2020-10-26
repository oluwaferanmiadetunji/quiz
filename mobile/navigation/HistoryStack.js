import React from 'react';
import History from '../screens/History';
import SingleHistory from '../screens/SingleHistory';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Header } from '../components';

const HomeStack = () => {
	return (
		<Stack.Navigator mode='card' headerMode='screen'>
			<Stack.Screen
				name='History'
				component={History}
				options={{
					header: ({ navigation, scene }) => <Header title='History' navigation={navigation} scene={scene} />,
					cardStyle: { backgroundColor: '#F8F9FE' },
				}}
			/>
			<Stack.Screen
				name='SingleHistory'
				component={SingleHistory}
				options={{
					header: ({ navigation, scene }) => <Header title='History' navigation={navigation} scene={scene} />,
					cardStyle: { backgroundColor: '#F8F9FE' },
				}}
			/>
		</Stack.Navigator>
	);
};

export default HomeStack;
