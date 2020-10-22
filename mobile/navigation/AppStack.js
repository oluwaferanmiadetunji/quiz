import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Menu';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import ArticlesStack from './ArticlesStack';
import ElementsStack from './ElementsStack';
import HistoryStack from './HistoryStack';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

const AppStack = () => {
	return (
		<Drawer.Navigator
			style={{ flex: 1 }}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			drawerStyle={{
				backgroundColor: 'white',
				width: width * 0.8,
			}}
			drawerContentOptions={{
				activeTintcolor: 'white',
				inactiveTintColor: '#000',
				activeBackgroundColor: 'transparent',
				itemStyle: {
					width: width * 0.75,
					backgroundColor: 'transparent',
					paddingVertical: 16,
					paddingHorizonal: 12,
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center',
					overflow: 'hidden',
				},
				labelStyle: {
					fontSize: 18,
					marginLeft: 12,
					fontWeight: 'normal',
				},
			}}
			initialRouteName='Home'>
			<Drawer.Screen name='Home' component={HomeStack} />
			<Drawer.Screen name='Profile' component={ProfileStack} />
			<Drawer.Screen name='History' component={HistoryStack} />
			<Drawer.Screen name='Elements' component={ElementsStack} />
			<Drawer.Screen name='Articles' component={ArticlesStack} />
		</Drawer.Navigator>
	);
};

export default AppStack;
