"use strict";

const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const ProfileActions = require('../actions/profile_actions');

const Header = React.createClass({
  getInitialState() {
    return { currentUserProfile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    console.log("componentDidMount in header.jsx");
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

  _toCurrUserProfile() {
    const currUserId = SessionStore.currentUser().id;
    hashHistory.push(`users/${currUserId}`);
  },

  render() {
    const currentUser = window.currentUser;
    return(
      <div className="header-main clearfix">
        <nav className="header-nav clearfix">

          <Link to={"/"} className="f-square-icon">
            <img src= "http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_30,w_30/v1467255790/icons/f-logo-white.png"></img>
          </Link>

          <div className="header-user redirect"
                onClick={this._toCurrUserProfile}>
            <img className="header-user-icon"
                  src={this.state.currentUserProfile.profile_img}></img>
            <Link to={`/users/${currentUser.id}`}
                  className="username-link">{currentUser.username}</Link>
        </div>

        <Link to={"/"} className="home">Home</Link>

          <button onClick={this._logout}
                  className="button-logout">Log Out</button>
        </nav>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Header;
