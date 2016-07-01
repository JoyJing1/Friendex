const React = require('react');
const Link = require('react-router').Link;
const FriendshipActions = require('../actions/friendship_actions');
const FriendshipStore = require('../stores/friendship_store');

const FriendRequestIndexItem = React.createClass({
  acceptFriendship() {
    const friendship = { id: this.props.friend.id,
                          status: "accepted"
    };
    FriendshipActions.updateFriendship(friendship);
  },

  denyFriendship() {
    const friendship = { id: this.props.friend.id,
                          status: "denied"
    };
    FriendshipActions.updateFriendship(friendship);
  },

  render() {
    const friend = this.props.friend;
    console.log('rendering friend_request_index_item');
    console.log(friend);
    
    return (
      <div className="friend-request-item clearfix">
        <img src={friend.profile_img}></img>

        <Link to={`/users/${friend.friend_id}`}>
          <h4>
            {friend.first_name} {friend.last_name}
          </h4>
        </Link>

        <div className="friend-request-buttons">
<<<<<<< HEAD
          <button className="confirm">Confirm</button>
          <button className="delete-request">Delete Request</button>
        </div>
=======
          <button className="confirm"
            onClick={this.acceptFriendship}>Confirm</button>
          <button className="delete-request"
            onClick={this.denyFriendship}>Delete Request</button>
        </div>

>>>>>>> friendships
      </div>
    );
  }
});

module.exports = FriendRequestIndexItem;
