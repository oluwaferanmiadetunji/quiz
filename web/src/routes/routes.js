import { lazy } from 'react';
import { PUBLIC_ROUTE_PATHS, AUTH_ROUTE_PATHS } from '../utils/constants';

const { ADD_ADMIN, ADD_COURSE, ADD_QUESTION, ADMINS, COURSES, QUESTION, QUESTIONS, USER, USERS } = AUTH_ROUTE_PATHS;
const { LOGIN, SIGNUP } = PUBLIC_ROUTE_PATHS;

/**
 * Routes for authenticated users
 * @constant
 */
export const AUTH_ROUTES = [
	{
		path: ADD_ADMIN,
		component: lazy(() => import('../pages/addAdmin')),
		exact: true,
	},
	{
		path: ADD_COURSE,
		component: lazy(() => import('../pages/addCourse')),
		exact: true,
	},
];

/**
 * Routes for unauthenticated users
 * @constant
 */
export const PUBLIC_ROUTES = [
	{
		path: LOGIN,
		component: lazy(() => import('../pages/login')),
		exact: true,
	},
];
