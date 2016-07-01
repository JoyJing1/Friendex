"use strict";

const React = require('react');
// const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const FriendshipStore = require('../stores/friendship_store');
const FriendshipActions = require('../actions/friendship_actions');
const FriendRequestIndex = require('./friend_request_index');
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

  componentWillReceiveProps() {
    FriendshipActions.fetchAllFriends(id);
  },

  _updateFriends() {
    console.log("_updateFriends() in FriendsPage");
    this.setState({ friends: FriendshipStore.friends(),
      friendRequestsReceived: FriendshipStore.friendRequestsReceived(),
      friendRequestsSent: FriendshipStore.friendRequestsSent()
    });
    console.log(FriendshipStore.friends());
    console.log(FriendshipStore.friendRequestsReceived());
    console.log(FriendshipStore.friendRequestsSent());
  },

  render() {
    console.log('render() in friends_page.jsx');
    console.log(this.state);
    return (
      <ul>
        <FriendRequestIndex friendRequestsReceived={this.state.friendRequestsReceived}/>

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
