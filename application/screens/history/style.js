import { StyleSheet } from 'react-native';
import { WHITE, BLACK } from '../../components/Color';

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
		marginTop: 10,
	},
	scrollView: {
		marginBottom: 40,
	},
	historyText: {
		fontSize: 18,
		color: WHITE,
		marginBottom: 10,
	},
	correct: {
		backgroundColor: 'green',
		borderColor: 'green',
		backgroundColor: 'green',
		marginVertical: 10,
		borderWidth: 0,
		shadowColor: BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
		marginBottom: 10,
		padding: 10,
	},
	incorrect: {
		backgroundColor: 'red',
		marginVertical: 10,
		borderWidth: 0,
		shadowColor: BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
		marginBottom: 10,
		padding: 10,
	},
	card: {
		backgroundColor: WHITE,
		marginVertical: 10,
		borderWidth: 0,
		shadowColor: BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
		marginBottom: 10,
	},
});
