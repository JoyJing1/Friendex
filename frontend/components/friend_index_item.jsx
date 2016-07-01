const React = require('react');
const Link = require('react-router').Link;
const FriendshipActions = require('../actions/friendship_actions');
const FriendshipStore = require('../stores/friendship_store');

const FriendIndexItem = React.createClass({
  render() {
    const friend = this.props.friend;
    console.log('rendering friend_index_item');
    console.log(friend);

    return (
      <div className="friend-item clearfix">
        <img src={friend.profile_img}></img>

        <Link to={`/users/${friend.friend_id}`}>
          <h4>
            {friend.first_name} {friend.last_name}
          </h4>
        </Link>

      </div>
    );
  }
});

module.exports = FriendIndexItem;
