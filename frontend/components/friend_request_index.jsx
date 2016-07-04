const React = require('react');
const FriendshipStore = require('../stores/friendship_store');
const FriendshipActions = require('../actions/friendship_actions');
const FriendRequestIndexItem = require('./friend_request_index_item');

const FriendRequestIndex = React.createClass({
  _checkFriendRequests() {
    if (this.props.friendRequestsReceived.length === 0) {
      return (
        <ul className="friend-request-body no-friend-requests">
          No pending friend requests
        </ul>
      );
    } else {
      return (
        <ul className="friend-request-body">
          {this.props.friendRequestsReceived.map( friend => {
            return <FriendRequestIndexItem friend={friend} key={friend.id}/>;
          })}
        </ul>
      );
    }
  },

  render() {
    console.log('rendering FriendRequestIndex');
    console.log(this.props.friendRequestsReceived);

    return (
      <div className="friend-request-container">
          <h3>
            <img className="friend-request-icon" src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_25,w_25/v1467347738/icons/iconmonstr-user-21-240_1.png">
            </img>Friend Requests
          </h3>

          {this._checkFriendRequests()}

          {this.props.children}
      </div>
    );
  }
});

module.exports = FriendRequestIndex;
