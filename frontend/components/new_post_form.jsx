"use strict";

const React = require('react');
const Link = require('react-router').Link;
// const hashHistory = require('react-router').hashHistory;
const ProfileActions = require('../actions/profile_actions');
const PostActions = require('../actions/post_actions');
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');
const ErrorStore = require('../stores/error_store');

const NewPostForm = React.createClass({
  getInitialState() {
    return { body: "",
            currentUserProfileImg: "" };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  componentWillReceiveProps(newProps) {
    ProfileActions.fetchCurrentUserProfile();
    // SessionActions.fetchCurrentUserProfile(newProps.profile.id);
    // this._onChange();
  },

  _onChange() {
    const currentUserProfile = SessionStore.currentUserProfile();
    this.setState( { currentUserProfileImg: currentUserProfile.profile_img } );
  },

  _newPostPrompt() {
    const receiverId = this.props.profile.user_id;
    if (receiverId && receiverId === SessionStore.currentUser().id) {
      return `What's on your mind?`;
    } else if (receiverId && receiverId !== SessionStore.currentUser().id) {
      return `Write something to ${this.props.profile.first_name}...`;
    } else {
      return "Write a new post!";
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const post = { body: this.state.body,
                        author_id: parseInt(SessionStore.currentUser().id),
                        receiver_id: parseInt(this.props.profile.id) };

    PostActions.createPost(post, () => {this.setState( {body: ""} );} );
  },

  _updatePost(e) {
    this.setState({ body: e.target.value });
  },

  _submitWithEnterKey(e) {
    if (e.keyCode == 13) {
      this.handleSubmit(e);
    }
  },

  render() {
    const numRows = Math.floor(this.state.body.length / 18);

    return(
      <div className="new-post-form-container">
        <nav>
          <img src="https://res.cloudinary.com/joyjing1/image/upload/v1467237872/icons/iconmonstr-pencil-14-240.png"
            className="icon-status">
          </img>Status
          <img src="https://res.cloudinary.com/joyjing1/image/upload/v1467238143/icons/iconmonstr-photo-camera-4-240.png"
            className="icon-photo">
          </img>Photo/Video
        </nav>

        <form className="new-post-form"
              onSubmit={this.handleSubmit}>
          <div className="new-post-body clearfix">

            <img src={this.state.currentUserProfileImg} className="new-post-profile-pic"></img>

            <div className="new-post-text-container">
              <textarea rows={numRows}
                cols="35" wrap="hard"
                value={this.state.body}
                placeholder={this._newPostPrompt()}
                onChange={this._updatePost}
                onKeyDown={this._submitWithEnterKey}>
              </textarea>

            </div>
          </div>

          <div className="new-post-submit">
            <input type="submit" value="Post"></input>
          </div>

        </form>
      </div>
    );
  }
});

module.exports = NewPostForm;

 // cols="35"  wrap="hard"
