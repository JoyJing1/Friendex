const Link  = require('react-router').Link
    , React = require('react');

const PostActions  = require('../actions/post_actions')
    , SessionStore = require('../stores/session_store');

const NewsfeedFriendshipItem = React.createClass({

  render() {
    return (
      <li>
        <div className="post-item-container">
          <div className="post-friends-info">

            <Link to={`/users/${this.props.friendship.friend_id}`}>
              <img src={this.props.friendship.friend_img}></img>
            </Link>

            <div className="post-friends-text">
              <div className="two-friends">
                <Link to={`/users/${this.props.friendship.friend_id}`}>
                  <h5>{this.props.friendship.friend_name}</h5>
                </Link>
                <p>became friends with</p>
                <Link to={`/users/${this.props.friendship.new_friend_id}`}>
                  <h5>{this.props.friendship.new_friend_name}</h5>
                </Link>
              </div>

              <h6>{$.timeago(this.props.friendship.updated_at)}</h6>
            </div>

            <Link to={`/users/${this.props.friendship.new_friend_id}`}>
              <img src={this.props.friendship.new_friend_img}></img>
            </Link>
          </div>

          <p>{this.props.friendship.body}</p>

          <ul className="post-footer">
            <a>
              <img src="https://res.cloudinary.com/joyjing1/image/upload/v1467323227/icons/iconmonstr-thumb-9-240_1.png"
                className="post-footer-like">
              </img>Like
            </a>

            <a>
              <img src="https://res.cloudinary.com/joyjing1/image/upload/v1467323294/icons/iconmonstr-speech-bubble-15-240_1.png"
                className="post-footer-comment">
              </img>Comment
            </a>

          </ul>

        </div>

      </li>
    );
  }
});

module.exports = NewsfeedFriendshipItem;
