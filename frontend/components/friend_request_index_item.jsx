const React = require('react');
const Link = require('react-router').Link;

const FriendRequestIndexItem = React.createClass({
  render() {
    const friend = this.props.friend;
    return (
      <div className="friend-request-item">
        <img src={friend.profile_img}></img>

        <Link to={`/users/${friend.friend_id}`}>
          <h4>
            {friend.first_name} {friend.last_name}
          </h4>
        </Link>

        <button className="confirm">Confirm</button>
        <button className="deleteRequest">Delete Request</button>
      </div>
    );
  }
});

module.exports = FriendRequestIndexItem;
