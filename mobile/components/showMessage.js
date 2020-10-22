import {showMessage} from 'react-native-flash-message';

const show = (message, type) => {
	return showMessage({
		message,
		type,
		hideOnPress: true,
		animated: true,
		autoHide: true,
	});
};

export default show;
