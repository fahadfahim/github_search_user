import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <AuthWrapper>
      <Switch>
        <PrivateRoute path='/' exact={true}>
          <Dashboard></Dashboard>
        </PrivateRoute>
        {/* <PrivateRoute path='/' component={Dashboard} exact /> */}
        <Route path='/login' component={Login} />
        <Route component={Error} />
      </Switch>
      </AuthWrapper>
      {/* <Router>
        <Switch>
      <Route exact path='/'>
      <Dashboard></Dashboard>
      </Route>
      <Route path='/login'>
      <Login />

      </Route>
      <Route path='*'>
      <Error />
      </Route>
      </Switch>
      </Router> */}
    </div>
  );
}

export default App;
