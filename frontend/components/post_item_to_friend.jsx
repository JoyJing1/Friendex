const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const PostActions = require('../actions/post_actions');

const PostItemToFriend = React.createClass({
  _deletePost() {
    PostActions.deletePost(this.props.post.id);
  },

  deleteButton() {
    if (this.props.post.author_id === SessionStore.currentUser().id || this.props.post.receiver_id === SessionStore.currentUser().id) {
      return (
        <button onClick={this._deletePost}
                className="delete-post">Remove Post</button>
      );
    }
  },

  render() {
    return (
      <li>
        <div className="post-item-container">
          <div className="post-author-info">

            <Link to={`/users/${this.props.post.author_id}`}>
              <img src={this.props.post.profile_img}></img>
            </Link>

            <div className="post-author-text">
              <div className="two-authors">
                <Link to={`/users/${this.props.post.author_id}`}>
                  <h5>{this.props.post.author_name}</h5>
                </Link>
                <img className="post-arrow" src="http://res.cloudinary.com/joyjing1/image/upload/v1467588331/icons/iconmonstr-arrow-37-240.png"></img>
                <Link to={`/users/${this.props.post.receiver_id}`}>
                  <h5>{this.props.post.receiver_name}</h5>
                </Link>
              </div>

              <h6>{$.timeago(this.props.post.created_at)}</h6>
            </div>
          </div>

          <p>{this.props.post.body}</p>

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

            {this.deleteButton()}
          </ul>

        </div>

      </li>
    );
  }
});

module.exports = PostItemToFriend;
