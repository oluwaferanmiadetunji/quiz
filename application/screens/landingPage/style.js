import { StyleSheet } from 'react-native';
import { WHITE, BLUE, BLACK } from '../../components/Color';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WHITE,
		alignItems: 'center',
	},
	image: {
		marginBottom: 15,
		marginTop: 25,
	},
	title: {
		fontSize: 30,
		color: BLUE,
		fontWeight: 'bold',
	},
	text: {
		color: BLACK,
		fontSize: 19,
		textAlign: 'center',
		fontWeight: '900',
		marginTop: 25,
	},
	button: {
		marginTop: 20,
	},
});
