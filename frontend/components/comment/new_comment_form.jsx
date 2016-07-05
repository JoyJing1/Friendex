"use strict";

const hashHistory = require('react-router').hashHistory
    , Link        = require('react-router').Link
    , React       = require('react');

const ErrorStore         = require('../../stores/error_store')
    // , ImageActions       = require('../../actions/image_actions')
    // , ImageStore         = require('../../stores/image_store')
    , CommentActions        = require('../../actions/comment_actions')
    , ProfileActions     = require('../../actions/profile_actions')
    // , ProfileStore       = require('../../stores/profile_store')
    , SessionStore       = require('../../stores/session_store');
    // , UploadPhotosButton = require('../photo/upload_photos_button');

const NewCommentForm = React.createClass({
  getInitialState() {
    // const currentUserProfile = SessionStore.currentUserProfile();
    return { body: "" };
  },

  // componentDidMount() {
  //   this.sessionListener = SessionStore.addListener(this._onChange);
  // },
  //
  // componentWillUnmount() {
  //   this.sessionListener.remove();
  // },
  //
  // componentWillReceiveProps(newProps) {
  //   ProfileActions.fetchCurrentUserProfile();
  // },

  // _onChange() {
  //   const currentUserProfile = SessionStore.currentUserProfile();
  //   this.setState( { currentUserProfileImg: currentUserProfile.profile_img } );
  // },

  // handleClickedTextComment(e) {
  //   document.getElementById("post-form-text").focus();
  // },

  handleSubmit(e) {
    e.preventDefault();
    let comment = { body: this.state.body,
                    user_id: this.props.currentUserProfile.id };

    // debugger;

    if (this.props.item.type === "post") {
      comment.post_id = this.props.item.id;

    } else if (this.props.item.type === "image") {
      comment.image_id = this.props.item.id;

    } else if (this.props.item.type === "friendship") {
      comment.friendship_id = this.props.item.id;
    }
    CommentActions.createComment(comment, () => {this.setState( {body: ""} );} );
  },

  _updateComment(e) {
    this.setState({ body: e.target.value });
  },

  _submitWithEnterKey(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
      this.setState( {body: ""} );
    }
  },

  // _toCurrUserProfile() {
  //   const currUserId = SessionStore.currentUser().id;
  //   hashHistory.push(`users/${currUserId}`);
  // },


  render() {
    const numRows = Math.floor(this.state.body.length / 18);

    return(
      <div className="new-comment-form-container">

        <form className="new-comment-form"
              onSubmit={this.handleSubmit}>

            <img src={this.props.currentUserProfileImg}
              className="new-comment-profile-pic"></img>

            <input type="text"
                  value={this.state.body}
                  placeholder="Write a comment..."
                  onChange={this._updateComment}
                  onKeyDown={this._submitWithEnterKey}>
            </input>
        </form>

      </div>
    );
  }
});

module.exports = NewCommentForm;
