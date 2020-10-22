import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import AppsIcon from '@material-ui/icons/Apps';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Styles } from './style';

const Routes = () => {
  const classes = Styles();
  return (
    <List>
      <NavLink activeClassName={classes.active} exact to="/">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <NavLink activeClassName={classes.active} exact to="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <NavLink activeClassName={classes.active} exact to="/projects">
        <ListItem button>
          <ListItemIcon>
            <AppsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <NavLink activeClassName={classes.active} exact to="/reports">
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <NavLink activeClassName={classes.active} exact to="/settings">
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <NavLink activeClassName={classes.active} exact to="/profile">
        <ListItem button>
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <NavLink activeClassName={classes.active} exact to="/login">
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <NavLink activeClassName={classes.active} exact to="/register">
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      </NavLink>
      <Divider style={{ background: '#fff' }} />
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      <Divider style={{ background: '#fff' }} />
    </List>
  );
};

export default Routes;
