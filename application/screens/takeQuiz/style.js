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
		marginBottom: 40,
	},
	registerContainer: {
		width: width * 0.95,
		height: height * 0.9,
		backgroundColor: '#F4F5F7',
		borderRadius: 4,
		shadowColor: BLACK,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 8,
		shadowOpacity: 0.1,
		elevation: 1,
		overflow: 'hidden',
	},

	button: {
		borderRadius: 20,
		borderColor: '#1976d2',
		width: width * 0.8,
		height: 'auto',
		marginTop: 20,
		backgroundColor: BLACK,
		color: BLACK,
	},

	correct: {
		borderRadius: 20,
		borderColor: 'green',
		width: width * 0.8,
		height: 'auto',
		marginTop: 20,
		backgroundColor: 'green',
	},
	white: {
		color: 'white',
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 14,
	},
	black: {
		color: BLACK,
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 14,
	},
	incorrect: {
		borderRadius: 20,
		borderColor: 'red',
		width: width * 0.8,
		height: 'auto',
		marginTop: 20,
		backgroundColor: 'red',
	},
	selected: {
		borderRadius: 20,
		borderColor: 'blue',
		width: width * 0.8,
		height: 'auto',
		marginTop: 20,
		backgroundColor: 'blue',
	},
});
