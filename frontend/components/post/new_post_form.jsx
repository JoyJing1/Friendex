"use strict";

const hashHistory = require('react-router').hashHistory
    , Link        = require('react-router').Link
    , React       = require('react');

const ErrorStore         = require('../../stores/error_store')
    , ImageActions       = require('../../actions/image_actions')
    , ImageStore         = require('../../stores/image_store')
    , PostActions        = require('../../actions/post_actions')
    , ProfileActions     = require('../../actions/profile_actions')
    , ProfileStore       = require('../../stores/profile_store')
    , SessionStore       = require('../../stores/session_store')
    , UploadPhotosButton = require('../photo/upload_photos_button');

const NewPostForm = React.createClass({
  getInitialState() {
    return { body: "" };
  },

  _newPostPrompt() {
    if (this.props.profile && this.props.currentUserProfile) {
      const receiverId = this.props.profile.user_id;
      const currentUserId = this.props.currentUserProfile.user_id;

      if (receiverId && receiverId === currentUserId) {
        return `What's on your mind?`;
      } else if (receiverId && receiverId !== currentUserId) {
        return `Write something to ${this.props.profile.first_name}...`;
      } else {
        return "Write a new post!";
      }
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
                    receiver_id: parseInt(this.props.profile.user_id),
                    author_id: parseInt(this.props.currentUserProfile.user_id) };

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

  selectImage(e) {
    e.preventDefault(e);
    const that = this;

    cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, images) {
        if (error === null) {
          for (let i = 0; i < images.length; i++) {
            that.addImage(images[i].url);
          }
          that.setState( {body: ""});
        }
      }
    );

  },

  addImage(url) {
    let img = { url: url,
                receiver_id: parseInt(this.props.profile.user_id),
                author_id: parseInt(this.props.currentUserProfile.user_id) };

    ImageActions.createImage(img);
  },

  render() {
    const numRows = Math.floor(this.state.body.length / 18);
    let profileImg = "";
    let userId = 1;
    if (this.props.currentUserProfile.profile_img) {
      userId = this.props.currentUserProfile.user_id;
      profileImg = this.props.currentUserProfile.profile_img.replace('upload', 'upload/c_scale,h_100');
    }

    return(
      <div className="new-post-form-container">
        <nav>

          <button className="add-post text-post"
                  onClick={this.handleClickedTextPost}>
            <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20,w_20/v1467237872/icons/iconmonstr-pencil-14-240.png"
              className="icon-status" alt="status">
            </img>Status
          </button>

          <button className="add-post photo-post"
                  onClick={this.selectImage}>
            <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_30,w_30/v1467238143/icons/iconmonstr-photo-camera-4-240.png"
              className="icon-photo" alt="photo">
            </img>Photo/Video
          </button>

        </nav>

        <form className="new-post-form"
              onSubmit={this.handleSubmit}>
          <div className="new-post-body clearfix">

            <div className="new-post-profile-pic">
              <Link className="redirect"
                    to={`users/${userId}`}>
                <img src={profileImg}></img>
              </Link>
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
