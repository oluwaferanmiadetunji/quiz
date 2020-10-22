import React from 'react';
import Articles from '../screens/Articles';
import Pro from '../screens/Pro';
import {createStackNavigator} from '@react-navigation/stack';
import {Header} from '../components';

const Stack = createStackNavigator();

const ArticlesStack = () => {
	return (
		<Stack.Navigator mode='card' headerMode='screen'>
			<Stack.Screen
				name='Articles'
				component={Articles}
				options={{
					header: ({navigation, scene}) => <Header title='Articles' navigation={navigation} scene={scene} />,
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

export default ArticlesStack;
