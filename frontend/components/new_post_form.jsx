"use strict";

const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;
const ProfileActions = require('../actions/profile_actions');
const ImageActions = require('../actions/image_actions');
const PostActions = require('../actions/post_actions');
const ImageStore = require('../stores/image_store');
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');
const ErrorStore = require('../stores/error_store');
const UploadPhotosButton = require('./upload_photos_button');

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
  },

  _onChange() {
    const currentUserProfile = SessionStore.currentUserProfile();
    this.setState( { currentUserProfileImg: currentUserProfile.profile_img } );
  },

  _newPostPrompt() {
    // console.log("_newPostPrompt() in new_post_form.jsx");
    const receiverId = this.props.profile.user_id;

    if (receiverId && receiverId === SessionStore.currentUser().id) {
      return `What's on your mind?`;
    } else if (receiverId && receiverId !== SessionStore.currentUser().id) {
      return `Write something to ${this.props.profile.first_name}...`;
    } else {
      return "Write a new post!";
    }

  },

  handleClickedTextPost(e) {
    document.getElementById("post-form-text").focus();
  },

  handleSubmit(e) {
    e.preventDefault();
    const post = { body: this.state.body,
                    receiver_id: parseInt(this.props.profile.id),
                    author_id: parseInt(SessionStore.currentUser().id) };

    PostActions.createPost(post, () => {this.setState( {body: ""} );} );
  },

  _updatePost(e) {
    this.setState({ body: e.target.value });
  },

  _submitWithEnterKey(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
      this.setState( {body: ""} );
    }
  },

  _toCurrUserProfile() {
    const currUserId = SessionStore.currentUser().id;
    hashHistory.push(`users/${currUserId}`);
  },

  selectImage(e) {
    e.preventDefault(e);
    const that = this;

    cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, images) {
        if (error === null) {
          console.log("Photo Upload succeeded in new_post_form.jsx");
          for (let i = 0; i < images.length; i++) {
            that.addImage(images[i].url);
          }
          that.setState( {body: ""});

        } else {
          console.log("Photo Upload failed in new_post_form.jsx");
          console.log(error);
        }
      }
    );

  },

  addImage(url) {
    let img = { url: url,
                receiver_id: parseInt(this.props.profile.id),
                author_id: parseInt(SessionStore.currentUser().id) };

    ImageActions.createImage(img);
  },

  render() {
    const numRows = Math.floor(this.state.body.length / 18);

    return(
      <div className="new-post-form-container">
        <nav>

          <button className="add-post text-post"
                  onClick={this.handleClickedTextPost}>
            <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20,w_20/v1467237872/icons/iconmonstr-pencil-14-240.png"
              className="icon-status">
            </img>Status
          </button>

          <button className="add-post photo-post"
                  onClick={this.selectImage}>
            <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_30,w_30/v1467238143/icons/iconmonstr-photo-camera-4-240.png"
              className="icon-photo">
            </img>Photo/Video
          </button>

        </nav>

        <form className="new-post-form"
              onSubmit={this.handleSubmit}>
          <div className="new-post-body clearfix">

            <div className="redirect" onClick={this._toCurrUserProfile}>
              <img src={this.state.currentUserProfileImg} className="new-post-profile-pic"></img>
            </div>

            <div className="new-post-text-container">
              <textarea rows={numRows}
                cols="35" wrap="hard"
                value={this.state.body}
                id="post-form-text"
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
