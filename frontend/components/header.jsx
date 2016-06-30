"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
// const ProfileTimeline = require('./profile_timelie');

const Header = React.createClass({
  _logout() {
    SessionActions.logOut();
  },

  _currentUserName() {
    return Profile.find("user_id", currentUser.id);
  },

  render() {
    const currentUsername = window.currentUser;
    return(
      <div className="header-main clearfix">
        <nav className="header-nav">

          <img className="f-square-icon" src="http://res.cloudinary.com/joyjing1/image/upload/v1467255790/icons/f-logo-white.png"></img>

          <div>
            <Link to={`/users/${currentUser.id}`}
                  className="username-link">{currentUser.username}</Link>
          </div>

          <button onClick={this._logout}
                  className="button-logout">Log Out</button>
        </nav>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Header;


// http://res.cloudinary.com/joyjing1/image/upload/v1467161024/icons/iconmonstr-facebook-3-240.png
// <img className="header-profile-icon"
//       src={currentUser.profile_img}></img>
