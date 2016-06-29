"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');
const Profile = require('./profile');
const Header = require('./header');

const App = React.createClass({
  render () {
    // Decide on which header to place here
    if (SessionStore.isUserLoggedIn()) {
      return(
        <div className="app-container">

          <Header/>
          {this.props.children}
        </div>
      );
    } else {
      return(
        <div className="app-container">

          {this.props.children}
        </div>
      );
    }
  }
});

module.exports = App;
// <h1>Currently NOT logged in</h1>
// <h1>Currently logged in</h1>
