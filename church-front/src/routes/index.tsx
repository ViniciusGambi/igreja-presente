import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Admin from '../pages/Admin';
import CreateEvent from '../pages/CreateEvent';
import PresenceList from '../pages/PresenceList';
import ResetPassword from '../pages/ResetPassword';
import AccountVerification from '../pages/AccountVerification';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SignIn} exact isLogin />
    <Route path="/login" component={SignIn} exact isLogin />
    <Route path="/cadastro" component={SignUp} exact isLogin />
    <Route path="/reset_password" component={ResetPassword} exact />
    <Route path="/verify_account" component={AccountVerification} exact />
    <Route path="/admin" component={Admin} exact isPrivate />
    <Route
      path="/admin/events/:eventId/list"
      component={PresenceList}
      exact
      isPrivate
    />
    <Route
      path="/admin/events/:eventId/edit"
      component={CreateEvent}
      exact
      isPrivate
    />
    <Route
      path="/admin/events/create"
      component={CreateEvent}
      exact
      isPrivate
    />
    <Route path="/:churchId" component={Dashboard} exact />
  </Switch>
);

export default Routes;
