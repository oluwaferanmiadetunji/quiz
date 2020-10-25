import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddIcon from '@material-ui/icons/Add';
import BarChartIcon from '@material-ui/icons/BarChart';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import { Styles } from './style';
import { ADD_QUESTION, ADD_ADMIN, QUESTIONS, REPORTS, USERS, ADMINS, ADD_COURSE, COURSES } from '../../constant';
import Logout from './Logout';

const Routes = () => {
  const classes = Styles();
  return (
    <List>
      <NavLink activeClassName={classes.active} exact to={ADD_ADMIN}>
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Add Admin" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />

      <NavLink activeClassName={classes.active} exact to={ADD_COURSE}>
        <ListItem button>
          <ListItemIcon>
            <AddIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Add Course" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />

      <NavLink activeClassName={classes.active} exact to={ADD_QUESTION}>
        <ListItem button>
          <ListItemIcon>
            <AddIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Add Question" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />

      <NavLink activeClassName={classes.active} exact to={ADMINS}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Admins" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />

      <NavLink activeClassName={classes.active} exact to={COURSES}>
        <ListItem button>
          <ListItemIcon>
            <ListIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />

      <NavLink activeClassName={classes.active} exact to={QUESTIONS}>
        <ListItem button>
          <ListItemIcon>
            <FormatListNumberedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />

      <NavLink activeClassName={classes.active} exact to={REPORTS}>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />

      <NavLink activeClassName={classes.active} exact to={USERS}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Users" />
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
