import React, { useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import OnboardingStack from './OnboardingStack';
import AppStack from './AppStack';
import AuthStack from './Authstack';
import { AuthContext } from '../components/context';
import { loginUser, getData, registerUser } from '../api/userApi';
import { loginReducer } from '../reducers/userReducer';
import jwtDecode from 'jwt-decode';
import show from '../components/showMessage';

const Stack = createStackNavigator();

const Screens = () => {
	const initialLoginState = {
		isLoading: true,
		email: null,
		userToken: null,
	};
	const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

	const authContext = useMemo(
		() => ({
			signIn: async (email, password) => {
				const response = await loginUser(email, password);
				if (response.userToken) {
					let { userToken } = response;
					try {
						await AsyncStorage.setItem('userToken', userToken);
						await AsyncStorage.setItem('name', response.name);
						await AsyncStorage.setItem('email', response.email);
					} catch (err) {
						console.log(err);
					}
					dispatch({ type: 'LOGIN', id: email, token: userToken });
					try {
						const userData = await getData();
						await AsyncStorage.setItem('userData', JSON.stringify(userData));
					} catch (err) {
						console.log(err);
					}
				} else {
					show('Wrong Credentials', 'danger');
					return { error: true };
				}
			},
			signOut: async () => {
				try {
					await AsyncStorage.clear();
				} catch (err) {
					console.log(err);
				}
				dispatch({ type: 'LOGOUT' });
			},
			signUp: async (name, email, password) => {
				const response = await registerUser(name, email, password);
				console.log(response);
				if (response.data.userToken !== undefined && response.data.userToken !== null && response.data.userToken !== '') {
					let { userToken } = response.data;
					try {
						await AsyncStorage.setItem('userToken', userToken);
						await AsyncStorage.setItem('name', response.data.name);
						show('Account created successfully!', 'success');
						dispatch({ type: 'REGISTER', id: email, token: userToken });
						const userData = await getData();
						await AsyncStorage.setItem('userData', JSON.stringify(userData));
					} catch (err) {
						console.log(err);
					}
				} else {
					show('Something went wrong!', 'warning');
					return { error: true };
				}
			},
		}),
		[],
	);

	useEffect(() => {
		setTimeout(async () => {
			let userToken = null;
			try {
				userToken = await AsyncStorage.getItem('userToken');
			} catch (err) {
				console.log(err);
			}
			dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
		}, 1000);
	}, []);

	return (
		<AuthContext.Provider value={authContext}>
			<Stack.Navigator mode='card' headerMode='none'>
				<Stack.Screen
					name='Onboarding'
					component={OnboardingStack}
					option={{
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					name='App'
					component={loginState.userToken !== null && jwtDecode(loginState.userToken).exp * 1000 > Date.now() ? AppStack : AuthStack}
				/>
			</Stack.Navigator>
		</AuthContext.Provider>
	);
};

export default Screens;
