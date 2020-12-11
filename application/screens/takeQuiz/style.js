import { StyleSheet, Dimensions } from 'react-native';
import { WHITE, BLACK } from '../../components/Color';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WHITE,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		color: BLACK,
		fontWeight: 'bold',
	},
	text: {
		fontSize: 18,
		color: BLACK,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	scrollView: {
		marginBottom: 0,
	},

	button: {
		height: 'auto',
		color: BLACK,
	},

	correct: {
		borderColor: 'green',
		height: 'auto',
		backgroundColor: 'green',
	},
	white: {
		color: '#fff',
		fontSize: 14,
	},
	black: {
		color: BLACK,
	},
	incorrect: {
		borderColor: 'red',
		height: 'auto',
		backgroundColor: 'red',
	},
	selected: {
		borderColor: 'blue',
		backgroundColor: 'blue',
	},
});
