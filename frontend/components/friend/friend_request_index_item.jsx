"use strict";

const hashHistory = require('react-router').hashHistory
    , Link        = require('react-router').Link
    , React       = require('react');

const FriendshipActions = require('../../actions/friendship_actions')
    , FriendshipStore = require('../../stores/friendship_store');

const FriendRequestIndexItem = React.createClass({
  acceptFriendship() {
    const friendship = { id: this.props.friend.id,
                          status: "accepted"
    };
    FriendshipActions.updateFriendship(friendship, "receiver");
  },

  denyFriendship() {
    const friendship = { id: this.props.friend.id,
                          status: "denied"
    };
    FriendshipActions.updateFriendship(friendship, "receiver");
  },

  render() {
    const friend = this.props.friend;
    console.log('rendering friend_request_index_item');
    console.log(friend);

    return (
      <div className="friend-request-item clearfix">

        <Link to={`/users/${friend.friend_id}`}>
          <img src={friend.profile_img}></img>
          <h4>
            {friend.first_name} {friend.last_name}
          </h4>
        </Link>

        <div className="friend-request-buttons">

          <button className="confirm"
                  onClick={this.acceptFriendship}>Confirm</button>
          <button className="delete-request"
                  onClick={this.denyFriendship}>Delete Request</button>
        </div>

      </div>
    );
  }
});

module.exports = FriendRequestIndexItem;
