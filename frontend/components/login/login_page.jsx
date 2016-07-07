"use strict";

const Link  = require('react-router').Link
    , React = require('react');

const LoginForm      = require('./login_form')
    , SessionActions = require('../../actions/session_actions')
    , SessionStore   = require('../../stores/session_store')
    , SignupForm     = require('./signup_form');

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

            <aside className="signup-right">
              <SignupForm className="signup=form"/>
            </aside>
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
