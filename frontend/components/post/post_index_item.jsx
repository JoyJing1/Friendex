"use strict";

const Link  = require('react-router').Link
    , React = require('react');

const CommentIndex = require('../comment/comment_index')
    , ImageActions  = require('../../actions/image_actions')
    , LikeActions  = require('../../actions/like_actions')
    , LikeCount  = require('./like_count')
    , NewCommentForm = require('../comment/new_comment_form')
    , NewsfeedActions   = require('../../actions/newsfeed_actions')
    , PostActions  = require('../../actions/post_actions')
    , SessionStore = require('../../stores/session_store');

const PostIndexItem = React.createClass({
  getInitialState() {
    return { liked: this.currentUserLikesPost(this.props.post) };
  },

  componentWillReceiveProps(newProps) {
    // console.log("componentWillReceiveProps(newProps) in post_index_item.jsx");
    // console.log(newProps);
    // debugger;
    // NewsfeedActions.fetchNewsfeed(id);
    // debugger;
    // debugger; // When updating, passing one like
    this.setState( { liked: this.currentUserLikesPost(newProps.post) } );
    // console.log("new state after this.setState() in componentWillreceiveProps in post_index_item.jsx");
  },

  // componentWillUpdate(newProps, newState) {
  //   this.setState( { liked: this.currentUserLikesPost(newProps.post) } );
  // },

  currentUserLikesPost(post) {
    // debugger;
    // console.log("currentUserLikesPost(post) in post_index_item.jsx");
    return post.likes.some( like => {
      return like.user_id === this.props.currentUserProfile.user_id;
    });
  },

  _deletePost() {
    PostActions.deletePost(this.props.post.id);
  },

  _deleteImage() {
    ImageActions.deleteImage(this.props.post.id);
  },

  deleteButton() {
    if (this.props.post.author_id === SessionStore.currentUser().id || this.props.post.receiver_id === SessionStore.currentUser().id) {
      if (this.props.post.type === "post") {
        return (
          <button onClick={this._deletePost}
            className="delete-post">Remove Post</button>
        );

      } else if (this.props.post.type === "image") {
        return (
          <button onClick={this._deleteImage}
            className="delete-post">Remove Photo</button>
        );
      }
    }
  },

  postBody() {
    if (this.props.post.type === "post") {
      return <p>{this.props.post.body}</p>;

    } else if (this.props.post.type === "image") {
      return (
        <img src={this.props.post.url}
        className="post-photo"></img>
      );
    }
  },

  changeFocus(e) {
    e.preventDefault();
    document.getElementById(`new-comment-${this.props.post.type}-${this.props.post.id}`).focus();
  },

  handleLiking(e) {
    console.log("handleLiking(e) in post_index_item.jsx");

    let currLike = this.state.liked;

    if (currLike) {
      if (this.props.post.type === "post") {
        LikeActions.deleteLike({ post_id: this.props.post.id});
      } else if (this.props.post.type === "image") {
        LikeActions.deleteLike({ image_id: this.props.post.id});
      }

    } else {
      if (this.props.post.type === "post") {
        LikeActions.createLike({ post_id: this.props.post.id});
      } else if (this.props.post.type === "image") {
        LikeActions.createLike({ image_id: this.props.post.id});
      }
    }

  },

  likeButton() {
    // console.log(`in likeButton() in post_index_item.jsx, current state.liked = ${this.state.liked}`);
    if (this.state.liked) {
      return (
        <button onClick={this.handleLiking} className="clickable color-liked">
          <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20/v1467778561/icons/iconmonstr-thumb-9-240_2.png"
            className="post-footer-like">
          </img>Like
        </button>
      );
    } else {
      return (
        <button onClick={this.handleLiking} className="clickable">
          <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20/v1467323227/icons/iconmonstr-thumb-9-240_1.png"
            className="post-footer-like">
          </img>Like
        </button>
      );
    }
  },

  render() {
    // console.log("render() in post_index_item.jsx");
    return (
      <li>
        <div className="post-item-container">
          <div className="post-author-info">

            <Link to={`/users/${this.props.post.author_id}`}>
              <img src={this.props.post.profile_img}></img>
            </Link>

            <div className="post-author-text">
              <Link to={`/users/${this.props.post.author_id}`}>
                <h5>{this.props.post.author_name}</h5>
              </Link>
              <h6>{$.timeago(this.props.post.created_at)}</h6>
            </div>
          </div>

          {this.postBody()}

          <ul className="post-footer">

            <LikeCount count={this.props.post.likes.length}/>

            {this.likeButton()}

            <button onClick={this.changeFocus} className="clickable">
              <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20/v1467323294/icons/iconmonstr-speech-bubble-15-240_1.png"
                className="post-footer-comment">
              </img>Comment
            </button>

            {this.deleteButton()}
          </ul>

        </div>


        <CommentIndex comments={this.props.post.comments}/>

        <NewCommentForm item={this.props.post}
            currentUserProfile={this.props.currentUserProfile}/>

        {this.props.children}

      </li>
    );
  }
});

module.exports = PostIndexItem;
