"use strict";

const Link  = require('react-router').Link
    , React = require('react');

const FriendshipActions = require('../../actions/friendship_actions')
    , FriendshipStore   = require('../../stores/friendship_store')
    , ProfileStore      = require('../../stores/profile_store')
    , SessionStore      = require('../../stores/session_store');

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
            onClick={this.removeFriendship}>Remove Friend</button>
        </div>
      );
    }
  },

  render() {
    const friend = this.props.friend;

    return (
      <div className="friend-item clearfix">

        <Link to={`/users/${friend.friend_id}`}>
          <div className="friend-img-container">
            <img src={friend.profile_img.replace('upload', 'upload/c_scale,h_100')} alt="friend"></img>
          </div>

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
