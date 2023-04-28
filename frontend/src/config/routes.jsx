import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import TodoPage from '../pages/todo';
import ParcelsPage from '../pages/parcels';
import DashboardPage from '../pages/dashboard';
import NotAuthorityPage from '../pages/authority';
import NotFoundPage from '../pages/404';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Routes = ({ socket }) => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {authCtx.user && authCtx.user.role === 0 && (
        <Switch>
          <Route exact path='/dashboard' component={NotAuthorityPage} />
          <Route
            exact
            path='/todo'
            render={() => <TodoPage socket={socket} />}
          />
          <Route
            exact
            path='/parcels'
            render={() => <ParcelsPage socket={socket} />}
          />
        </Switch>
      )}
      {authCtx.user && authCtx.user.role === 1 && (
        <Switch>
          <Route
            exact
            path='/dashboard'
            render={() => <DashboardPage socket={socket} />}
          />
          <Route exact path='/todo' component={NotAuthorityPage} />
          <Route
            exact
            path='/parcels'
            render={() => <ParcelsPage socket={socket} />}
          />
        </Switch>
      )}
      {!authCtx.user && (
        <Switch>
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/' render={() => <Redirect exact to='/login' />} />
          <Route exact path='/dashboard' component={NotAuthorityPage} />
          <Route exact path='/todo' component={NotAuthorityPage} />
          <Route exact path='/parcels' component={NotAuthorityPage} />
          <Route exact path='*' component={NotFoundPage} />
        </Switch>
      )}
    </>
  );
};

export default Routes;
