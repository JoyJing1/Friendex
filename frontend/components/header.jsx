"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Header = React.createClass({
  _logout() {
    SessionActions.logOut();
  },

  _currentUserName() {
    debugger;
    return Profile.find("user_id", currentUser.id);
  },

  render() {
    return(
      <div className="header-main clearfix">
        <nav className="header-nav">

          <img className="f-square-icon" src="http://res.cloudinary.com/joyjing1/image/upload/v1467161024/icons/iconmonstr-facebook-3-240.png"></img>

          <button onClick={this._logout}
                  className="button-logout">Log Out</button>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
