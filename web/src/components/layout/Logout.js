import React from 'react';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { isLogged } from '../../pages/login/redux';

const Logout = () => {
	const dispatch = useDispatch();
	return (
		<>
			<ListItem
				button
				onClick={() => {
					localStorage.removeItem('Token');
					dispatch(isLogged(false));
				}}>
				<ListItemIcon>
					<ExitToAppIcon color='primary' />
				</ListItemIcon>
				<ListItemText primary='Logout' />
			</ListItem>
			<Divider style={{ background: '#fff' }} />
		</>
	);
};

export default Logout;
