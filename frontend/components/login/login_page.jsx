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

              <h1>Connect with friends and the world around you on Friendex</h1>

              <ul className="logged-out-left">
                <li>
                  <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467995306/icons/iconmonstr-share-2-240.png"></img>
                  <span className="login-bold">See photos and updates</span>
                  <span className="login-normal">from friends in News Feed</span>
                </li>
                <li>
                  <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467995306/icons/iconmonstr-share-2-240.png"></img>
                  <span className="login-bold">Share whta's new</span>
                  <span className="login-normal">in your life on your Timeline</span>
                </li>
                <li>
                  <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467995306/icons/iconmonstr-share-2-240.png"></img>
                  <span className="login-bold">Find more</span>
                  <span className="login-normal">of what you're looking for with Friendex Search</span>
                </li>
              </ul>


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
