const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const NewsfeedActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');
const PostItemToFriend = require('./post_item_to_friend');
const NewsfeedFriendshipItem = require('./newsfeed_friendship_item');

const NewsfeedIndexItem = React.createClass({
  post_item() {
    if (this.props.news.type === "post") {
      // If posting on own wall
      if (this.props.news.author_id === this.props.news.receiver_id) {
        return (
          <div className="newsfeed-item news-post-self">
            <PostIndexItem post={this.props.news}/>
          </div>
        );
      } else {
        return (
          <div className="newsfeed-item news-post">
            <PostItemToFriend post={this.props.news}/>
          </div>
        );
      }


    }
  },

  friendship_item() {
    if (this.props.news.type === "friendship") {
      return (
        <div className="newsfeed-item news-friendship">
          <NewsfeedFriendshipItem friendship={this.props.news}/>
        </div>
      );
    }
  },

  render() {
    return (
      <div className="newfeed-index-item">
        {this.friendship_item()}
        {this.post_item()}
      </div>
    );
  }
});

module.exports = NewsfeedIndexItem;




// <div className="post-item-container">
//   <div className="post-author-info">
//
//     <Link to={`/users/${this.props.post.author_id}`}>
//       <img src={this.props.post.profile_img}></img>
//     </Link>
//
//     <div className="post-author-text">
//       <Link to={`/users/${this.props.post.author_id}`}>
//         <h5>{this.props.post.author_name}</h5>
//       </Link>
//       <h6>{$.timeago(this.props.post.created_at)}</h6>
//     </div>
//   </div>
//
//   <p>{this.props.post.body}</p>
//
//   <ul className="post-footer">
//     <a>
//       <img src="https://res.cloudinary.com/joyjing1/image/upload/v1467323227/icons/iconmonstr-thumb-9-240_1.png"
//         className="post-footer-like">
//       </img>Like
//     </a>
//
//     <a>
//       <img src="https://res.cloudinary.com/joyjing1/image/upload/v1467323294/icons/iconmonstr-speech-bubble-15-240_1.png"
//         className="post-footer-comment">
//       </img>Comment
//     </a>
//
//     {this.deleteButton()}
//   </ul>
//
// </div>
