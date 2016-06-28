"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');

const App = React.createClass({
  render () {
    return (
      <div>
        <header>
          <Link to="/" className="header-link">
            <h1>Welcome to Friendex!</h1>
          </Link>
        </header>


        <LoginForm/>

        <aside className="signup-left"/>
        <SignupForm/>

        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
