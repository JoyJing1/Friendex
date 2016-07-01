"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileAbout = require('./profile_about');
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const FriendshipActions = require('../actions/friendship_actions');
const SessionStore = require('../stores/session_store');

const ProfileHeader = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile() };
  },

  componentWillReceiveProps(newProps) {
    ProfileActions.fetchSingleProfile(newProps.params.id);
  },

  componentDidMount() {
    console.log("componentDidMount() in profile_header.jsx");
    const id = parseInt(this.props.params.id);
    ProfileActions.fetchSingleProfile(id);
    this.profileListener = ProfileStore.addListener(this._updateProfile);
  },

  componentWillUnmount() {
    this.profileListener.remove();
  },

  _updateProfile(profile) {
    this.setState({ profile: ProfileStore.currentProfile() });
    console.log("_updateProfile(profile) in profile_header.jsx");
  },

  _sendFriendRequest(e) {
    e.preventDefault(e);

    const friendship = { requestor_id: SessionStore.currentUser().id,
                          receiver_id: ProfileStore.currentProfile().user_id,
                          status: "pending"};
    FriendshipActions.createFriendship(friendship);
  },

  friendButton() {
    // Only return if not currently friends and no request has been sent
    return(
      <button className="add-friend" onClick={this._sendFriendRequest}>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467342419/icons/iconmonstr-user-8-240.png">
        </img>
        Add Friend
      </button>
    );

  },

  render() {
    return(
      <header className="profile-nav clearfix">
        <div className="background-container clearfix">
          <img src={this.state.profile.background_img} className="background-img"/>
        </div>

        <div className="profile-header-nav">
          <img src={this.state.profile.profile_img} className="profile-img"/>
          <h1>{this.state.profile.username}</h1>
          {this.friendButton()}

          <nav className="profile-tabs">
            <Link to={`/users/${this.state.profile.user_id}/timeline`}>Timeline</Link>
            <Link to={`/users/${this.state.profile.user_id}/about`}>About</Link>
            <Link to={`/users/${this.state.profile.user_id}/friends`}>Friends</Link>
            <Link to={`/users/${this.state.profile.user_id}`}>Photos</Link>
          </nav>
        </div>

        {this.props.children}
      </header>
    );
  }
});

module.exports = ProfileHeader;
