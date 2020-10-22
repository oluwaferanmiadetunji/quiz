import React, { useState } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import { Styles } from './style';
import Routes from './Routes';

const SideBar = () => {
  const classes = Styles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#111' }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{ marginRight: 25 }}
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="primary"
            noWrap
            className={clsx(classes.title, {
              [classes.shift]: open
            })}
          >
            Dashboard
          </Typography>
          <IconButton color="primary">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={open ? classes.toolbar : classes.hide} style={{ backgroundColor: '#111111', color: 'white' }}>
          <IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider style={{ background: '#fff' }} />
        <Routes />
      </Drawer>
    </>
  );
};

export default SideBar;
