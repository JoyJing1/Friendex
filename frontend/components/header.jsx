"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const ProfileActions = require('../actions/profile_actions');
// const ProfileTimeline = require('./profile_timelie');

const Header = React.createClass({
  getInitialState() {
    return { currentUserProfile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    console.log("componentDidMount in header.jsx");
    console.log(currentUser);
    ProfileActions.fetchCurrentUserProfile();
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  _onChange() {
    this.setState( { currentUserProfile: SessionStore.currentUserProfile()});
  },

  _logout() {
    SessionActions.logOut();
  },

  _currentUserProfile() {
    console.log("_currentUserProfile() in header.jsx");
    console.log(SessionStore.currentUserProfile());
    return SessionStore.currentUserProfile();
  },

  render() {
    const currentUsername = window.currentUser;
    return(
      <div className="header-main clearfix">
        <nav className="header-nav clearfix">

          <img className="f-square-icon" src="http://res.cloudinary.com/joyjing1/image/upload/v1467255790/icons/f-logo-white.png"></img>

          <div className="header-user" >
            <img className="header-user-icon"
                  src={this.state.currentUserProfile.profile_img}></img>
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
