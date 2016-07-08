"use strict";

const hashHistory = require('react-router').hashHistory
    , Link        = require('react-router').Link
    , React       = require('react');

const ProfileActions = require('../actions/profile_actions')
    , SearchBar = require('./search_bar')
    , SessionActions = require('../actions/session_actions')
    , SessionStore   = require('../stores/session_store');

const Header = React.createClass({
  getInitialState() {
    return { currentUserProfile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    // console.log("componentDidMount in header.jsx");
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
    // hashHistory.push('/login');
  },

  _currentUserProfile() {
    // console.log("_currentUserProfile() in header.jsx");
    // console.log(SessionStore.currentUserProfile());
    return SessionStore.currentUserProfile();
  },

  _toCurrUserProfile() {
    const currUserId = SessionStore.currentUser().id;
    hashHistory.push(`users/${currUserId}`);
  },

  render() {
    const currentUser = SessionStore.currentUser();

    return(
      <div className="header-main clearfix">
        <nav className="header-nav clearfix">

          <aside className="header-left">
            <Link to={"/"} className="f-square-icon">
              <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_30,w_30/v1467995683/icons/Facebook-48.png"></img>
            </Link>

            <SearchBar/>
          </aside>

          <aside className="header-right">

            <div className="header-user redirect"
              onClick={this._toCurrUserProfile}>
              <div className="header-user-icon">
                <img src={this.state.currentUserProfile.profile_img}
                  alt="profile-img"/>
              </div>

              <Link to={`/users/${currentUser.id}`}
                className="username-link">{currentUser.username}</Link>
            </div>

            <Link to={"/"} className="home">Home</Link>

            <button onClick={this._logout}
              className="button-logout">Log Out</button>
          </aside>

        </nav>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Header;
