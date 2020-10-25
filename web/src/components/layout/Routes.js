import React, { Suspense, lazy } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Sidebar from './Sidebar';
import { Styles } from './style';
import {
  ADD_QUESTION,
  ADD_ADMIN,
  LOGIN,
  QUESTIONS,
  REPORTS,
  USERS,
  ADMIN_SIGNUP,
  RESET_PASSWORD,
  QUESTION,
  ADMINS,
  ADD_COURSE,
  COURSES
} from '../../constant';
import AuthRoutes from './AuthRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const AddQuestion = lazy(() => import('../addQuestion' /* webpackChunkName: "Add Question Page" */));
const AddAdmin = lazy(() => import('../addAdmin' /* webpackChunkName: "Add Admin Page" */));
const Login = lazy(() => import('../login' /* webpackChunkName: "Login Page" */));
const Questions = lazy(() => import('../questions' /* webpackChunkName: "Questions Page" */));
const Reports = lazy(() => import('../reports' /* webpackChunkName: "Reports Page" */));
const Users = lazy(() => import('../users' /* webpackChunkName: "Users Page" */));
const Admins = lazy(() => import('../admins' /* webpackChunkName: "Admins Page" */));
const Signup = lazy(() => import('../signup' /* webpackChunkName: "Signup Page" */));
const ResetPassword = lazy(() => import('../resetPassword' /* webpackChunkName: "Reset Password Page" */));
const Question = lazy(() => import('../question' /* webpackChunkName: "Question Page" */));
const AddCourse = lazy(() => import('../addCourse' /* webpackChunkName: "Add Course Page" */));
const Courses = lazy(() => import('../courses' /* webpackChunkName: "Courses Page" */));
const ErrorPage = lazy(() => import('../error' /* webpackChunkName: "Error Page" */));

const Routes = () => {
  const classes = Styles();
  return (
    <Router>
      <Suspense
        fallback={
          <Backdrop
            open={true}
            style={{
              zIndex: 200,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.9)'
            }}
          >
            <CircularProgress />
          </Backdrop>
        }
      >
        <div className={classes.root}>
          <Sidebar />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <AuthRoutes exact path={ADD_QUESTION} component={AddQuestion} />
              <AuthRoutes exact path={ADD_COURSE} component={AddCourse} />
              <AuthRoutes exact path={ADD_ADMIN} component={AddAdmin} />
              <AuthRoutes exact path={ADMINS} component={Admins} />
              <Route exact path={RESET_PASSWORD} component={ResetPassword} />
              <Route exact path={ADMIN_SIGNUP} component={Signup} />
              <AuthRoutes exact path={COURSES} component={Courses} />
              <AuthRoutes exact path={QUESTIONS} component={Questions} />
              <AuthRoutes exact path={QUESTION} component={Question} />
              <AuthRoutes exact path={REPORTS} component={Reports} />
              <AuthRoutes exact path={USERS} component={Users} />
              <ProtectedRoutes exact path={LOGIN} component={Login} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </main>
        </div>
      </Suspense>
    </Router>
  );
};

export default Routes;
