"use strict";

const React = require('react');

const FriendIndex         = require('./friend_index')
    , FriendRequestIndex  = require('./friend_request_index')
    , FriendshipActions   = require('../actions/friendship_actions')
    , FriendshipStore     = require('../stores/friendship_store')
    , ProfileActions      = require('../actions/profile_actions')
    , ProfileStore        = require('../stores/profile_store')
    , SessionStore        = require('../stores/session_store');

const FriendsPage = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile(),
              friends: FriendshipStore.friends(),
              friendRequestsReceived: FriendshipStore.friendRequestsReceived(),
              friendRequestsSent: FriendshipStore.friendRequestsSent() };
  },

  componentDidMount() {
    const id = parseInt(this.props.params.id);
    console.log("componentDidMount() in friends_page.jsx");
    console.log(id);

    ProfileActions.fetchSingleProfile(id);
    this.profileListener = ProfileStore.addListener(this._updateFriends);

    FriendshipActions.fetchAllFriends(id);
    this.friendListener = FriendshipStore.addListener(this._updateFriends);
  },

  componentWillUnmount() {
    this.profileListener.remove();
    this.friendListener.remove();
  },

  componentWillReceiveProps(newProps) {
    FriendshipActions.fetchAllFriends(newProps.profile.user_id);
  },

  _updateFriends() {
    console.log("_updateFriends() in FriendsPage");
    const friends = FriendshipStore.friends();
    const friendRequestsReceived = FriendshipStore.friendRequestsReceived();
    const friendRequestsSent = FriendshipStore.friendRequestsSent();

    this.setState({ friends: friends,
      friendRequestsReceived: friendRequestsReceived,
      friendRequestsSent: friendRequestsSent
    });
    console.log('after this.setState() in friends_page.jsx. New state below:');
    console.log(friends);
    console.log(friendRequestsReceived);
    console.log(friendRequestsSent);
  },

  _friendRequestIndex() {
    const currentUserId = SessionStore.currentUser().id;
    const profileId = ProfileStore.currentProfile().user_id;
    if (currentUserId === profileId) {
      return(
        <FriendRequestIndex friendRequestsReceived={this.state.friendRequestsReceived}/>
      );
    }
  },

  render() {
    console.log('render() in friends_page.jsx');
    console.log(this.state);
    return (
      <ul>
        {this._friendRequestIndex()}

        <FriendIndex friends={this.state.friends}/>
        {this.props.children}
      </ul>
    );
  }
});

module.exports = FriendsPage;
