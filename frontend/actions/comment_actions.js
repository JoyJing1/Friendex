"use strict";

const AppDispatcher    = require('../dispatcher/dispatcher')
    , CommentConstants = require('../constants/comment_constants')
    , CommentApiUtil   = require('../util/comment_api_util')
    , ErrorActions     = require('./error_actions');

const CommentActions = {
  createComment(comment, resetNewCommentForm) {
    if (comment.post_id) {
      CommentApiUtil.createPostComment(comment, (resp) => {
        this.receiveSingleComment(resp);
        resetNewCommentForm();
      });
    } else if (comment.image_id) {
      CommentApiUtil.createImageComment(comment, (resp) => {
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
    if (ids.post_id) {
      CommentApiUtil.deletePostComment(ids, (resp) => {
        CommentActions.removedComment(resp);
      });
    } else if (ids.image_id) {
      CommentApiUtil.deleteImageComment(ids, (resp) => {
        CommentActions.removedComment(resp);
      });
    } else if (ids.friendship_id) {
      CommentApiUtil.deleteFriendshipComment(ids, (resp) => {
        CommentActions.removedComment(resp);
      });
    }
  },

  receiveSingleComment(comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.UPDATE_COMMENT,
      comment: comment
    });
  },

  removedComment(comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.REMOVED_COMMENT,
      comment: comment
    });
  }
};

module.exports = CommentActions;
