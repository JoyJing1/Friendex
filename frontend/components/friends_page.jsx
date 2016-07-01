"use strict";

const React = require('react');
// const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const FriendshipStore = require('../stores/friendship_store');
const FriendshipActions = require('../actions/friendship_actions');
const FriendRequestIndex = require('./friend_request_index');
const FriendIndex = require('./friend_index');
// const FriendHeader = require('./friend_header');

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

  render() {
    console.log('render() in friends_page.jsx');
    console.log(this.state);
    return (
      <ul>
        <FriendRequestIndex friendRequestsReceived={this.state.friendRequestsReceived}/>

        <FriendIndex friends={this.state.friends}/>
        {this.props.children}
      </ul>
    );
  }
});

module.exports = FriendsPage;

 // className="friend-page"

// {
//   this.state.friends.map(friend => {
//     return <li key={friend.id}>{friend.id}</li>;
//   })
// }
// <FriendRequestIndex friendRequests={this.state.friendRequestsReceived}/>

//
// <h5>Friends</h5>
// {this.state.friends.length}
// {
//   this.state.friends.map(friend => {
//     return (
//       <li key={friend.id}>{friend.first_name}</li>
//     );
//   })
// }
//
// <h5>Requests Received</h5>
// {this.state.friendRequestsReceived.length}
// {
//   this.state.friendRequestsReceived.map(friend => {
//     return (
//       <li key={friend.id}>{friend.first_name}</li>
//     );
//   })
// }
//
// <h5>Requests Sent</h5>
// {this.state.friendRequestsSent.length}
// {
//   this.state.friendRequestsSent.map(friend => {
//     return (
//       <li key={friend.id}>{friend.first_name}</li>
//     );
//   })
// }
//
