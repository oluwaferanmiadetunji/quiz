import React, { Suspense, lazy } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const Home = lazy(() => import('./components/home' /* webpackChunkName: "Home Page" */));
const Dashboard = lazy(() => import('./components/dashboard' /* webpackChunkName: "Dashboard Page" */));
const Login = lazy(() => import('./components/login' /* webpackChunkName: "Login Page" */));
const Profile = lazy(() => import('./components/profile' /* webpackChunkName: "Profile Page" */));
const Projects = lazy(() => import('./components/projects' /* webpackChunkName: "Projects Page" */));
const Register = lazy(() => import('./components/register' /* webpackChunkName: "Register Page" */));
const Reports = lazy(() => import('./components/reports' /* webpackChunkName: "Reports Page" */));
const Settings = lazy(() => import('./components/settings' /* webpackChunkName: "Settings Page" */));

const Routes = () => (
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reports" component={Reports} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
