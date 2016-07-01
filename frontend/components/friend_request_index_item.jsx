const React = require('react');
const Link = require('react-router').Link;

const FriendRequestIndexItem = React.createClass({
  render() {
    const friend = this.props.friend;
    return (
      <div className="friend-request-item clearfix">
        <img src={friend.profile_img}></img>

        <Link to={`/users/${friend.friend_id}`}>
          <h4>
            {friend.first_name} {friend.last_name}
          </h4>
        </Link>

        <div className="friend-request-buttons">
          <button className="confirm">Confirm</button>
          <button className="delete-request">Delete Request</button>
        </div>
      </div>
    );
  }
});

module.exports = FriendRequestIndexItem;
