"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const PostConstants = require('../constants/post_constants');
const PostApiUtil = require('../util/post_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const PostActions = {
  createPost(post, resetNewPostForm) {
    console.log("createPost(post) in post_actions.js");
    PostApiUtil.createPost(post, (resp) => {
      this.receiveSinglePost(resp);
      resetNewPostForm();
    });
  },

  updatePost(post) {
    console.log("updatePost(post) in post_actions.js");
    PostApiUtil.updatePost(post, this.receiveSinglePost);
  },

  deletePost(id) {
    console.log("deletePost(id) in post_actions.js");
    PostApiUtil.deletePost(id, () => {
      console.log("Post successfully deleted");
    });
  },

  fetchSinglePost(id) {
    console.log("fetchSinglePost(id) in post_actions.js");
    PostApiUtil.fetchPost(id, this.receiveSinglePost);
  },

  receiveSinglePost(post) {
    AppDispatcher.dispatch({
      actionType: PostConstants.UPDATE_POST,
      post: post
    });
  }
};

module.exports = PostActions;
