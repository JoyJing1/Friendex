"use strict";

const Link  = require('react-router').Link
    , React = require('react');

const CommentIndex = require('../comment/comment_index')
    , LikeActions = require('../../actions/like_actions')
    , LikeCount  = require('../post/like_count')
    , NewCommentForm = require('../comment/new_comment_form')
    , PostActions  = require('../../actions/post_actions')
    , SessionStore = require('../../stores/session_store');

const NewsfeedFriendshipItem = React.createClass({
  getInitialState() {
    return { liked: this.currentUserLikesPost(this.props.friendship) };
  },

  componentWillReceiveProps(newProps) {
    this.setState( { liked: this.currentUserLikesPost(newProps.friendship) } );
  },

  currentUserLikesPost(friendship) {
    return friendship.likes.some( like => {
      return like.user_id === this.props.currentUserProfile.user_id;
    });
  },

  changeFocus() {
    document.getElementById(`new-comment-${this.props.friendship.type}-${this.props.friendship.id}`).focus();
  },

  setLiked(e) {
    console.log("setLiked() in newsfeed_friendship_item.jsx");
    e.preventDefault();

    LikeActions.createLike({ friendship_id: this.props.friendship.id }, (resp) => {
      this.setState( { liked: true });
    });
  },

  setUnliked(e) {
    console.log("setUnliked() in newsfeed_friendship_item.jsx");
    e.preventDefault();

    LikeActions.deleteLike({ friendship_id: this.props.friendship.id }, (resp) => {
      this.setState( { liked: false });
    });
  },

  likeButton() {
    if (this.state.liked) {
      return (
        <button onClick={this.setUnliked} className="clickable color-liked">
          <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20/v1467778561/icons/iconmonstr-thumb-9-240_2.png"
            className="post-footer-like" alt="like">
          </img>Like
        </button>
      );
    } else {
      return (
        <button onClick={this.setLiked} className="clickable">
          <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20/v1467323227/icons/iconmonstr-thumb-9-240_1.png"
            className="post-footer-like" alt="like">
          </img>Like
        </button>
      );
    }
  },

  render() {
    return (
      <li>
        <div className="post-item-container">
          <div className="post-friends-info">

            <div className="user-profile-img-container">
              <Link to={`/users/${this.props.friendship.friend_id}`}>
                <img src={this.props.friendship.friend_img.replace('upload','upload/c_scale,w_75')}></img>
              </Link>
            </div>

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

            <div className="user-profile-img-container">
              <Link to={`/users/${this.props.friendship.new_friend_id}`}>
                <img src={this.props.friendship.new_friend_img}></img>
              </Link>
            </div>

          </div>

          <p>{this.props.friendship.body}</p>

          <ul className="post-footer">

            <LikeCount count={this.props.friendship.likes.length}/>

            {this.likeButton()}

            <button onClick={this.changeFocus}>
              <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20/v1467323294/icons/iconmonstr-speech-bubble-15-240_1.png"
                className="post-footer-comment" alt="comment">
              </img>Comment
            </button>

          </ul>

        </div>

        <CommentIndex comments={this.props.friendship.comments}/>

        <NewCommentForm item={this.props.friendship}
            currentUserProfile={this.props.currentUserProfile}/>

        {this.props.children}

      </li>
    );
  }
});

module.exports = NewsfeedFriendshipItem;
