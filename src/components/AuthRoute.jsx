import React from 'react';
import { Route, Redirect } from "react-router-dom";
import cookie from 'js-cookie';
import {connect} from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {

  console.log(rest.loggedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.loggedIn ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps)(AuthRoute);