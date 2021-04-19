import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
//how to private route work we're going to have a private route
//and we will wrap our route the one that we would want to protect 
//for private route we have to wrap the dashboard 
//then dashboard become the children thats why we have to inherite the props

const PrivateRoute = ({children,...rest}) => {
  const {isAuthenticated,user} = useAuth0();
  const isUser = isAuthenticated && user;
  
  return (
    <Route
    {...rest}
    render={() =>{
      return isUser ? children : <Redirect to='/login'></Redirect>
    }}
    >

    </Route>
  );
};
export default PrivateRoute;
