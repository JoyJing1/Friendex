"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileAbout = require('./profile_about');
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const FriendshipActions = require('../actions/friendship_actions');
const SessionStore = require('../stores/session_store');
const FriendshipStore = require('../stores/friendship_store');


const ProfileHeader = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile(),
              friends: FriendshipStore.friends(),
              friendRequestsReceived: FriendshipStore.friendRequestsReceived(),
              friendRequestsSent: FriendshipStore.friendRequestsSent() };
  },

  componentWillReceiveProps(newProps) {
    ProfileActions.fetchSingleProfile(newProps.params.id);
    FriendshipActions.fetchAllFriends(newProps.profile.user_id);
  },

  componentDidMount() {
    console.log("componentDidMount() in profile_header.jsx");
    const id = parseInt(this.props.params.id);
    ProfileActions.fetchSingleProfile(id);
    this.profileListener = ProfileStore.addListener(this._updateProfile);

    FriendshipActions.fetchAllFriends(id);
    this.friendshipListener = FriendshipStore.addListener(this._updateProfile);
  },

  componentWillUnmount() {
    this.profileListener.remove();
    this.friendshipListener.remove();
  },

  _updateProfile() {
    const profile = ProfileStore.currentProfile();
    const friends = FriendshipStore.friends();
    const friendRequestsReceived = FriendshipStore.friendRequestsReceived();
    const friendRequestsSent = FriendshipStore.friendRequestsSent();

    this.setState({ profile: profile,
          friends: friends,
          friendRequestsReceived: friendRequestsReceived,
          friendRequestsSent: friendRequestsSent
        });
    // this.setState({ profile: ProfileStore.currentProfile() });
    // Also need to update friendship value
    console.log("_updateProfile() in profile_header.jsx");
  },

  _sendFriendRequest(e) {
    e.preventDefault(e);

    const friendship = { requestor_id: SessionStore.currentUser().id,
                          receiver_id: ProfileStore.currentProfile().user_id,
                          status: "pending"};
    FriendshipActions.createFriendship(friendship);
  },

  friendshipButton() {
    // const currentUser = SessionStore.currentUser();
    // console.log("friendshipButton() in profile_header.jsx");
    // // Need to just pull/check ids rather than full object (holding different info so won't be the same)
    // if (currentUser === ProfileStore.currentProfile) {
    //   console.log("Visiting own page, do NOT show friend button");
    // } else if (this.state.friends.includes(currentUser)) {
    //   // Button says "Remove Friend"
    //   console.log('Currently friends, should remove button');
    // } else if (this.state.friendRequestsReceived.includes(currentUser)) {
    //   console.log("Current user has sent a friend request, button should say CANCEL REQUEST");
    // } else if (this.state.friendRequestsSent.includes(currentUser)) {
    //   console.log("Current user has a request from profile, should show ACCEPT FRIEND REQUEST and DENY FRIEND REQUEST buttons");
    // } else {
    //   console.log("Pair not connected, show ADD FRIEND button");
    // }

    return(
      <button className="add-friend" onClick={this._sendFriendRequest}>
        <img src="https://res.cloudinary.com/joyjing1/image/upload/v1467342419/icons/iconmonstr-user-8-240.png">
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
          {this.friendshipButton()}

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
