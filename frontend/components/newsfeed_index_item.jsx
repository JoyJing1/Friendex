const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const NewsfeedActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');
const PostItemToFriend = require('./post_item_to_friend');
const NewsfeedFriendshipItem = require('./newsfeed_friendship_item');

const NewsfeedIndexItem = React.createClass({
  
  post_item() {
    if (this.props.news.type === "post" || this.props.news.type === "image") {
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
