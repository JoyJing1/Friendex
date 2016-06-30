"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');

const LoginPage = React.createClass({
  render () {
    if (!SessionStore.isUserLoggedIn()) {
      return (
        <div className="logged-out-page">
          <header className="logged-out-header">
            <LoginForm/>
          </header>

          <div className="logged-out-body">
            <aside className="signup-left"/>
            <SignupForm className="signup=form"/>
          </div>

          {this.props.children}
        </div>
      );
    } else {
      return(
        <div>Logged in but trying to access login_page</div>
      );
    }
  }
});

module.exports = LoginPage;
