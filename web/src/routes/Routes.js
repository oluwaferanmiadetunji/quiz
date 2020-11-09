import React, { lazy } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { PUBLIC_ROUTE_PATHS, AUTH_ROUTE_PATHS } from '../utils/constants';
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';

const { ADD_ADMIN, ADD_COURSE, ADD_QUESTION, ADMINS, COURSES, QUESTION, QUESTIONS, USER, USERS } = AUTH_ROUTE_PATHS;
const { LOGIN, SIGNUP } = PUBLIC_ROUTE_PATHS;

const AddAdmin = lazy(() => import('../pages/addAdmin' /* webpackChunkName: "Add Admin Page" */));
const AddCourse = lazy(() => import('../pages/addCourse' /* webpackChunkName: "Add Course Page" */));
const Courses = lazy(() => import('../pages/courses' /* webpackChunkName: "Courses Page" */));
const Login = lazy(() => import('../pages/login' /* webpackChunkName: "Login Page" */));
const Questions = lazy(() => import('../pages/questions' /* webpackChunkName: "Questions Page" */));
const Question = lazy(() => import('../pages/question' /* webpackChunkName: "Question Page" */));
const AddQuestion = lazy(() => import('../pages/addQuestion' /* webpackChunkName: "Add Question Page" */));

const Routes = () => (
	<Router>
		<Switch>
			<Authenticated exact path={ADD_ADMIN} component={AddAdmin} />

			<Authenticated exact path={ADD_COURSE} component={AddCourse} />

			<Authenticated exact path={ADD_QUESTION} component={AddQuestion} />

			<Authenticated exact path={COURSES} component={Courses} />

			<Authenticated exact path={QUESTIONS} component={Questions} />

			<Authenticated exact path={QUESTION} component={Question} />

			<Unauthenticated exact path={LOGIN} component={Login} />
		</Switch>
	</Router>
);

export default Routes;
