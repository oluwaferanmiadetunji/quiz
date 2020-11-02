import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import { Styles } from './style';
import { AUTH_ROUTE_PATHS, titles } from '../../utils/constants';
import Logout from './Logout';

const { ADD_COURSE, ADD_QUESTION, ADMINS, COURSES, QUESTIONS, USERS, ADD_ADMIN } = AUTH_ROUTE_PATHS;

const Routes = () => {
	const classes = Styles();
	return (
		<List>
			<NavLink activeClassName={classes.active} exact to={ADD_ADMIN}>
				<ListItem button>
					<ListItemIcon>
						<PersonAddIcon color='primary' />
					</ListItemIcon>
					<ListItemText primary={titles.ADD_ADMIN} />
				</ListItem>
			</NavLink>
			<Divider style={{ background: '#fff' }} />

			<NavLink activeClassName={classes.active} exact to={ADD_COURSE}>
				<ListItem button>
					<ListItemIcon>
						<AddIcon color='primary' />
					</ListItemIcon>
					<ListItemText primary={titles.ADD_COURSE} />
				</ListItem>
			</NavLink>
			<Divider style={{ background: '#fff' }} />

			<NavLink activeClassName={classes.active} exact to={ADD_QUESTION}>
				<ListItem button>
					<ListItemIcon>
						<AddIcon color='primary' />
					</ListItemIcon>
					<ListItemText primary={titles.ADD_QUESTION} />
				</ListItem>
			</NavLink>
			<Divider style={{ background: '#fff' }} />

			<NavLink activeClassName={classes.active} exact to={ADMINS}>
				<ListItem button>
					<ListItemIcon>
						<PeopleIcon color='primary' />
					</ListItemIcon>
					<ListItemText primary={titles.ADMINS} />
				</ListItem>
			</NavLink>
			<Divider style={{ background: '#fff' }} />

			<NavLink activeClassName={classes.active} exact to={COURSES}>
				<ListItem button>
					<ListItemIcon>
						<ListIcon color='primary' />
					</ListItemIcon>
					<ListItemText primary={titles.COURSES} />
				</ListItem>
			</NavLink>
			<Divider style={{ background: '#fff' }} />

			<NavLink activeClassName={classes.active} exact to={QUESTIONS}>
				<ListItem button>
					<ListItemIcon>
						<FormatListNumberedIcon color='primary' />
					</ListItemIcon>
					<ListItemText primary={titles.QUESTIONS} />
				</ListItem>
			</NavLink>
			<Divider style={{ background: '#fff' }} />

			<NavLink activeClassName={classes.active} exact to={USERS}>
				<ListItem button>
					<ListItemIcon>
						<PeopleIcon color='primary' />
					</ListItemIcon>
					<ListItemText primary={titles.USERS} />
				</ListItem>
			</NavLink>
			<Divider style={{ background: '#fff' }} />

			<ListItem />
			<ListItem />
			<ListItem />

			<Divider style={{ background: '#fff' }} />

			<Logout />
		</List>
	);
};

export default Routes;
