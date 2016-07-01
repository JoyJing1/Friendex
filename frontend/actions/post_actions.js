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
    PostApiUtil.deletePost(id, (resp) => {
      PostActions.removedPost(resp);
      console.log("Post successfully deleted");
    });
  },

  fetchSinglePost(id) {
    console.log("fetchSinglePost(id) in post_actions.js");
    PostApiUtil.fetchPost(id, this.receiveSinglePost);
  },

  fetchManyPosts(ids) {
    console.log("fetchManyPosts(ids) in post_actions.js");
    PostApiUtil.fetchManyPosts(ids, this.receiveManyPosts);
  },

  receiveSinglePost(post) {
    AppDispatcher.dispatch({
      actionType: PostConstants.UPDATE_POST,
      post: post
    });
  },

  receiveManyPosts(posts) {
    AppDispatcher.dispatch({
      actionType: PostConstants.UPDATE_POSTS,
      posts: posts
    });
  },

  removedPost(post) {
    console.log('in removedPost(post) in post_actions.js');
    console.log(post);
    AppDispatcher.dispatch({
      actionType: PostConstants.REMOVED_POST,
      post: post
    });
  }
};

module.exports = PostActions;
