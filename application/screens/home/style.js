import { StyleSheet } from 'react-native';
import { WHITE, BLUE, BLACK } from '../../components/Color';

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
		marginLeft: 20,
		marginTop: 2,
	},
});
