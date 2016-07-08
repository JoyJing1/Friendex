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

          <div className="logged-out-body clearfix">
            <aside className="signup-left clearfix">

              <h1 className="signed-out-header">Connect with friends and the world around you on Friendex.</h1>

              <ul className="logged-out-left">
                <li>
                  <img src="https://scontent-lax.xx.fbcdn.net/t39.2365-6/851565_602269956474188_918638970_n.png"></img>
                  <span className="login-bold">See photos and updates</span>
                  <span className="login-normal">from friends in News Feed</span>
                </li>
                <li>
                  <img src="https://scontent-lax.xx.fbcdn.net/t39.2365-6/851585_216271631855613_2121533625_n.png"></img>
                  <span className="login-bold">Share whta's new</span>
                  <span className="login-normal">in your life on your Timeline</span>
                </li>
                <li>
                  <img src="https://scontent-lax.xx.fbcdn.net/t39.2365-6/851558_160351450817973_1678868765_n.png"></img>
                  <span className="login-bold">Find more</span>
                  <span className="login-normal">of what you're looking for with Friendex Search</span>
                </li>
              </ul>
            </aside>


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

//
// src="https://scontent-lax.xx.fbcdn.net/t39.2365-6/851585_216271631855613_2121533625_n.png"
