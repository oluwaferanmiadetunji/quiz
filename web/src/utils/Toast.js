import { toast } from 'react-toastify';

const data = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
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
