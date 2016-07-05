"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const CommentConstants = require('../constants/comment_constants');
const CommentApiUtil = require('../util/comment_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const CommentActions = {
  createComment(comment, resetNewCommentForm) {
    console.log("createComment(comment) in comment_actions.js");

    if (comment.post_id) {
      CommentApiUtil.createPostComment(comment, (resp) => {
        this.receiveSingleComment(resp);
        resetNewCommentForm();
      });
    } else if (comment.image_id) {
      CommentApiUtil.createImagComment(comment, (resp) => {
        this.receiveSingleComment(resp);
        resetNewCommentForm();
      });
    } else if (comment.friendship_id) {
      CommentApiUtil.createFriendshipComment(comment, (resp) => {
        this.receiveSingleComment(resp);
        resetNewCommentForm();
      });
    }
  },

  deleteComment(ids) {
    console.log("deleteComment(id) in comment_actions.js");

    if (ids.post_id) {
      CommentApiUtil.deletePostComment(ids, (resp) => {
        CommentActions.removedComment(resp);
        console.log("PostComment successfully deleted");
      });
    } else if (ids.image_id) {
      CommentApiUtil.deleteImageComment(ids, (resp) => {
        CommentActions.removedComment(resp);
        console.log("ImageComment successfully deleted");
      });
    } else if (ids.friendship_id) {
      CommentApiUtil.deleteFriendshipComment(ids, (resp) => {
        CommentActions.removedComment(resp);
        console.log("FriendshipComment successfully deleted");
      });
    }
  },

  receiveSingleComment(comment) {
    console.log("receiveSingleComment(comment) in comment_actions.js");
    AppDispatcher.dispatch({
      actionType: CommentConstants.UPDATE_POST,
      comment: comment
    });
  },

  removedComment(comment) {
    console.log('in removedComment(comment) in comment_actions.js');
    console.log(comment);
    AppDispatcher.dispatch({
      actionType: CommentConstants.REMOVED_POST,
      comment: comment
    });
  }
};

module.exports = CommentActions;