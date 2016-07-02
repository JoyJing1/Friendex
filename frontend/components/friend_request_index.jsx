const React = require('react');
const FriendshipStore = require('../stores/friendship_store');
const FriendshipActions = require('../actions/friendship_actions');
const FriendRequestIndexItem = require('./friend_request_index_item');

const FriendRequestIndex = React.createClass({
  render() {
    console.log('rendering FriendRequestIndex');
    console.log(this.props.friendRequestsReceived);

    return (
      <div className="friend-request-container">
          <h3>
            <img className="friend-request-icon" src="https://res.cloudinary.com/joyjing1/image/upload/v1467347738/icons/iconmonstr-user-21-240_1.png">
            </img>Friend Requests
          </h3>

          <ul className="friend-request-body">
            {this.props.friendRequestsReceived.map( friend => {
              return <FriendRequestIndexItem friend={friend} key={friend.id}/>;
            })}
          </ul>

          {this.props.children}
      </div>
    );
  }
});

module.exports = FriendRequestIndex;
