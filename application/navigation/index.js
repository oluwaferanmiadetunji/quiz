import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Home from '../screens/home';
import ForgotPassword from '../screens/forgotPassword';
import LandingPage from '../screens/landingPage';
import Profile from '../screens/profile';
import Quiz from '../screens/quiz';
import Summary from '../screens/summary';
import Update from '../screens/updateProfile';
import History from '../screens/history';
import { useSelector } from 'react-redux';
import { _retrieveData } from '../utils/storage';
import Header from './Header';

const Stack = createStackNavigator();

export default () => {
	const isLoggedIn = useSelector(({ isUserLoggedIn }) => isUserLoggedIn);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{!isLoggedIn && (
					<>
						<Stack.Screen
							name='App'
							component={LandingPage}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name='Login' component={Login} options={{ title: '' }} />
						<Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: '' }} />
					</>
				)}

				{isLoggedIn && (
					<>
						<Stack.Screen name='Home' component={Home} options={{ headerTitle: (props) => <Header {...props} /> }} />
						<Stack.Screen name='Profile' component={Profile} options={{ title: '' }} />
						<Stack.Screen name='Quiz' component={Quiz} options={{ headerShown: false }} />
						<Stack.Screen name='Summary' component={Summary} options={{ title: '' }} />
						<Stack.Screen name='Update' component={Update} options={{ title: '' }} />
						<Stack.Screen name='History' component={History} options={{ headerTitle: (props) => <Header {...props} /> }} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};
