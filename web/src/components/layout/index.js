/* eslint-disable react/display-name */
import React from 'react';

import { Styles } from './style';
import Sidebar from './Sidebar';

const Layout = (Component) => () => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Component />
      </main>
    </div>
  );
};

export default Layout;
