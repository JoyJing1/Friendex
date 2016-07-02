const React = require('react');
const FriendshipStore = require('../stores/friendship_store');
const FriendshipActions = require('../actions/friendship_actions');
const FriendIndexItem = require('./friend_index_item');

const FriendIndex = React.createClass({
  render() {
    console.log('rendering FriendIndex');
    console.log(this.props.friends);

    return (
      <div className="friend-container">
          <h3>
            <img className="friend-icon" src="https://res.cloudinary.com/joyjing1/image/upload/v1467347814/icons/iconmonstr-user-29-240.png">
            </img>Friends
          </h3>

          <ul className="friend-body">
            {this.props.friends.map( friend => {
              return <FriendIndexItem friend={friend} key={friend.id}/>;
            })}
          </ul>

          {this.props.children}
      </div>
    );
  }
});

module.exports = FriendIndex;
