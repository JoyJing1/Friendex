"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const FriendshipConstants = require('../constants/friendship_constants');
const FriendshipApiUtil = require('../util/friendship_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const FriendshipActions = {
  createFriendship(friendship) {
    console.log("createFriendship(friendship) in friendship_actions.js");
    FriendshipApiUtil.createFriendship(friendship, this.receiveSingleFriendship);
  },

  updateFriendship(friendship, page) {
    console.log("updateFriendship(friendship) in friendship_actions.js");
    FriendshipApiUtil.updateFriendship(friendship, page, this.receiveSingleFriendship);
  },

  removeFriendship(friendship) {
    console.log("removeFriendship(friendship) in friendship_actions.js");
    FriendshipApiUtil.deleteFriendship(friendship, this.receiveSingleFriendship);
  },

  fetchSingleFriendship(id) {
    console.log("fetchSingleFriendship(id) in friendship_actions.js");
    FriendshipApiUtil.fetchFriendship(id, this.receiveSingleFriendship);
  },

  fetchAllFriends(id) {
    console.log("fetchAllFriends(id) in friendship_actions.js");
    FriendshipApiUtil.fetchManyFriendships(id, this.receiveManyFriendships);
  },

  receiveSingleFriendship(friendship) {
    AppDispatcher.dispatch({
      actionType: FriendshipConstants.UPDATE_FRIENDSHIP,
      friendship: friendship
    });
  },

  receiveManyFriendships(friendships) {
    AppDispatcher.dispatch({
      actionType: FriendshipConstants.UPDATE_FRIENDSHIPS,
      friends: friendships["friends"],
      friend_requests_received: friendships["friend_requests_received"],
      friend_requests_sent: friendships["friend_requests_sent"]
    });
  }

};

module.exports = FriendshipActions;
