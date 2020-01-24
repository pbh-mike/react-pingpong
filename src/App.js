import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import EventAdd from "./EventAdd";

import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";
// import './css/tailwind.css';
import './css/normalize.css';
import './css/style.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL + '/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout>
                  <div className="bg-gray-300 h-screen">
                      <GuestRoute path="/login" component={Login} />
                      <GuestRoute path="/register" component={Register} />
                      <AuthRoute path="/profile" component={Profile} />
                      <AuthRoute path="/dashboard" component={Dashboard} />
                      <AuthRoute path="/events/add" component={EventAdd} />
                  </div>
                </Layout>
            </Router>
        </ApolloProvider>
    );
}

export default App;
