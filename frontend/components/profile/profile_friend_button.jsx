"use strict";

const hashHistory = require('react-router').hashHistory
    , Link        = require('react-router').Link
    , React       = require('react');

const FriendshipActions = require('../../actions/friendship_actions')
    , FriendshipStore   = require('../../stores/friendship_store');

const ProfileFriendButton = React.createClass({

  _sendFriendRequest(e) {
    e.preventDefault(e);

    const friendship = { requestor_id: this.props.currentUser.id,
                          receiver_id: this.props.profile.user_id,
                          status: "pending"};
    FriendshipActions.createFriendship(friendship);
  },

  _acceptFriendship(e) {
    e.preventDefault(e);

    const friendship = { requestor_id: this.props.profile.user_id,
                          receiver_id: this.props.currentUser.id,
                          status: "accepted" };
    FriendshipActions.updateFriendship(friendship, "requestor");
  },

  _rejectFriendship(e) {
    e.preventDefault(e);

    const friendship = { requestor_id: this.props.profile.user_id,
                          receiver_id: this.props.currentUser.id,
                          status: "denied" };
    FriendshipActions.updateFriendship(friendship, "requestor");
  },

  _cancelFriendRequest(e) {
    e.preventDefault(e);

    const friendship = { requestor_id: this.props.currentUser.id,
                          receiver_id: this.props.profile.user_id };
    FriendshipActions.removeFriendship(friendship);
  },

  _toCurrUserFriends(id) {
    hashHistory.replace(`users/${this.props.currentUser.id}/friends`);
  },

  _checkConnection(id, arrayFriends) {
      let included = false;
      arrayFriends.forEach(friend => {
        if (friend.friend_id === id) {
          included = true;
        }
      });
      return included;
  },

  _currentlyFriendsButton() {
    return(
      <button className="add-friend currently-friends"
              onClick={this._toCurrUserFriends}>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467497415/iconmonstr-check-mark-1-240_uufxhe.png">
        </img>
        Friends
      </button>
    );
  },

  _addFriendButton() {
    return(
      <button className="add-friend"
              onClick={this._sendFriendRequest}>
        <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467342419/icons/iconmonstr-user-8-240.png">
        </img>
        Add Friend
      </button>
    );
  },

  _cancelFriendRequestButton() {
    return(
      <button className="add-friend cancel-request"
              onClick={this._cancelFriendRequest}>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467495849/iconmonstr-user-11-240_1_ehz8lh.png">
        </img>
        Cancel Request
      </button>
    );
  },

  _acceptFriendRequest() {
    return(
      <button className="add-friend accept-request"
              onClick={this._acceptFriendship}>
        <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467342419/icons/iconmonstr-user-8-240.png">
        </img>
        Confirm Friendship
      </button>
    );
  },

  _rejectFriendRequest() {
    return(
      <button className="add-friend cancel-request"
              onClick={this._rejectFriendship}>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467495849/iconmonstr-user-11-240_1_ehz8lh.png">
        </img>
        Delete Request
      </button>
    );
  },

  render() {
    const currentUserId = this.props.currentUser.id;
    console.log("friendshipButton() in profile_header.jsx");

    if (currentUserId === this.props.profile.user_id) {
      console.log("Visiting own page, do NOT show friend button");
      return <div></div>;

    } else if (this._checkConnection(currentUserId, this.props.friends)) {
      console.log('Currently friends, do not show button');
      return this._currentlyFriendsButton();

    } else if (this._checkConnection(currentUserId, this.props.friendRequestsReceived)) {
      console.log("Current user has sent a friend request, button should say CANCEL REQUEST");
      return this._cancelFriendRequestButton();

    } else if (this._checkConnection(currentUserId, this.props.friendRequestsSent)) {
      console.log("Current user has a request from profile, should show ACCEPT FRIEND REQUEST and DENY FRIEND REQUEST buttons");
      return (
        <div className='friend-request-accept-reject'>
          {this._acceptFriendRequest()}
          {this._rejectFriendRequest()}
        </div>
      );

    } else {
      console.log("Pair not connected, show ADD FRIEND button");
      return this._addFriendButton();
    }

  },
});

module.exports = ProfileFriendButton;
