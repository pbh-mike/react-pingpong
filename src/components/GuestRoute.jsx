import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !rest.loggedIn ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
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

export default connect(mapStateToProps)(GuestRoute);