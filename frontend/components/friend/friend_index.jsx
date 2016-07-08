"use strict";

const React = require('react');

const FriendshipActions = require('../../actions/friendship_actions')
    , FriendIndexItem   = require('./friend_index_item')
    , FriendshipStore   = require('../../stores/friendship_store');

const FriendIndex = React.createClass({
  _checkFriends() {
    if (this.props.friends.length === 0) {
      return (
        <ul className="friend-body no-friends">
          No friends to show
        </ul>
      );
    } else {
      return (
        <ul className="friend-body">
          {this.props.friends.map( friend => {
            return <FriendIndexItem friend={friend} key={friend.id}/>;
          })}
        </ul>
      );
    }
  },

  render() {
    return (
      <div className="friend-container">
          <h3>
            <img className="friend-icon" src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_35,w_35/v1467347814/icons/iconmonstr-user-29-240.png">
            </img>Friends
          </h3>

          {this._checkFriends()}

          {this.props.children}
      </div>
    );
  }
});

module.exports = FriendIndex;
