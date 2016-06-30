const React = require('react');

const PostIndexItem = React.createClass({
  _timeWritten() {
    // const now = new Date();
    // debugger;
    // const timeAgo = new Date(this.props.post.created_at) - now;
    // Use timeago jQuery plugin
  },

  render() {
    return (
      <li>
        <div className="post-item-container">
          <div className="post-author-info">
            <img src={this.props.post.profile_img}></img>
            <h5>{this.props.post.author_name}</h5>
            <time className="timeago" datetime={this.props.post.created_at}></time>
          </div>

          <p>{this.props.post.body}</p>

          <ul classNAme="post-footer">
            <li>Like</li>
            <li>Comment</li>
          </ul>

        </div>

      </li>
    );
  }
});

module.exports = PostIndexItem;
