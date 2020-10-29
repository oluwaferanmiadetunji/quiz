import { StyleSheet } from 'react-native';
import { WHITE, BLACK } from '../../components/Color';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WHITE,
		alignItems: 'center',
	},
	title: {
		fontSize: 30,
		color: BLACK,
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
	pickerView: {
		borderWidth: 1,
		borderColor: BLACK,
		borderRadius: 4,
	},
	picker: {
		height: 50,
	},
});
