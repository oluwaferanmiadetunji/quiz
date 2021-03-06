import React from 'react';
import { Styles } from './style';
import Sidebar from './Drawer';

export default (Component) => () => {
	const Layout = () => {
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

	return Layout();
};
