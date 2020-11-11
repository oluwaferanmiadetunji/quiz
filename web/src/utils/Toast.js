import { toast } from 'react-toastify';

const data = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: true,
	progress: false,
};

export default (message, type) => {
	switch (type) {
		case 'ok':
			return toast.success(message, data);
		case 'error':
		default:
			return toast.error(message, data);
	}
};
