import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import argonTheme from '../constants/Theme';
import Images from '../constants/Images';
import Icon from '../components/Icon';
import { DrawerItem as DrawerCustomItem } from '../components';
import { AuthContext } from '../components/context';

function CustomDrawerContent({ navigation, state }) {
	const { signOut } = React.useContext(AuthContext);
	const screens = ['Home', 'Profile', 'History', 'Contact Us'];

	return (
		<Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
			<Block flex={0.06} style={styles.header}>
				<Image styles={styles.logo} source={Images.Logo} />
			</Block>
			<Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
				<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
					{screens.map((item, index) => {
						return <DrawerCustomItem title={item} key={index} navigation={navigation} focused={state.index === index ? true : false} />;
					})}
					<TouchableOpacity
						style={{ height: 60 }}
						onPress={async () => {
							await signOut();
						}}>
						<Block flex row style={styles.defaultStyle}>
							<Block middle flex={0.1} style={{ marginRight: 5 }}>
								<Icon name='spaceship' family='ArgonExtra' size={14} color={argonTheme.COLORS.ERROR} />
							</Block>
							<Block row center flex={0.9}>
								<Text size={15} bold color={argonTheme.COLORS.ERROR}>
									Signout
								</Text>
							</Block>
						</Block>
					</TouchableOpacity>
				</ScrollView>
			</Block>
		</Block>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 28,
		paddingBottom: theme.SIZES.BASE,
		paddingTop: theme.SIZES.BASE * 3,
		justifyContent: 'center',
	},
	defaultStyle: {
		paddingVertical: 16,
		paddingHorizontal: 16,
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 8,
		shadowOpacity: 0.1,
	},
});

export default CustomDrawerContent;
