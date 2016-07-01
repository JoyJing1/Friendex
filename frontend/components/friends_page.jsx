"use strict";

const React = require('react');
// const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');
const FriendshipStore = require('../stores/friendship_store');
const FriendshipActions = require('../actions/friendship_actions');
const FriendRequestIndex = require('./friend_request_index');
// const FriendHeader = require('./friend_header');

const FriendsPage = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile(),
              friends: {},
              friendRequests: {} };
  },

  componentDidMount() {
    // Listen to ProfileStore
    // Pull id --> Pull friends

    const id = parseInt(this.props.params.id);
    console.log("componentDidMount() in friends_page.jsx");
    console.log(id);
    // debugger;
    FriendshipActions.fetchAllFriends(id);
    this.friendListener = FriendshipStore.addListener(this._updateFriend);
  },

  componentWillUnmount() {
    this.friendListener.remove();
  },

  _updateFriend(friend) {
    // this.setState({ friend: FriendshipStore.currentFriend() });
    // console.log("_updateFriend(friend) in friend.jsx");
    // console.log(this.state);
  },

  _splitFriends(friends) {
    // Helper method to split friend list into friends & friendRequests
  },

  render () {
    // Only want to show friend requests when on own profile page
    return (
      <div className="friend-page">
        <FriendRequestIndex friendRequests={this.state.friendRequests}/>
      </div>
    );
  }
});

module.exports = FriendsPage;
