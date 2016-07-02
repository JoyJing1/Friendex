const React = require('react');
const Link = require('react-router').Link;
const FriendshipActions = require('../actions/friendship_actions');
const FriendshipStore = require('../stores/friendship_store');
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');

const FriendIndexItem = React.createClass({
  removeFriendship() {
    const friendship = { id: this.props.friend.id,
                          status: "denied"
    };
    FriendshipActions.updateFriendship(friendship);
  },

  removeFriendButton() {
    const currentUserId = SessionStore.currentUser().id;
    const profileId = ProfileStore.currentProfile().user_id;
    if (currentUserId === profileId) {
      return(
        <div className="friend-buttons">
          <button className="remove-friend"
            onClick={this.denyFriendship}>Remove Friend</button>
        </div>
      );
    }
  },

  render() {
    const friend = this.props.friend;
    console.log('rendering friend_index_item');
    console.log(friend);

    return (
      <div className="friend-item clearfix">

        <Link to={`/users/${friend.friend_id}`}>
          <img src={friend.profile_img}></img>
          <h4>
            {friend.first_name} {friend.last_name}
          </h4>
        </Link>

        {this.removeFriendButton()}

      </div>
    );
  }
});

module.exports = FriendIndexItem;
