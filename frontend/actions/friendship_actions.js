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

  updateFriendship(friendship) {
    console.log("updateFriendship(friendship) in friendship_actions.js");
    FriendshipApiUtil.updateFriendship(friendship, this.receiveSingleFriendship);
  },

  //
  // deleteFriendship(id) {
  //   console.log("deleteFriendship(id) in friendship_actions.js");
  //   FriendshipApiUtil.deleteFriendship(id, (resp) => {
  //     FriendshipActions.removedFriendship(resp);
  //     console.log("Friendship successfully deleted");
  //   });
  // },

  fetchSingleFriendship(id) {
    console.log("fetchSingleFriendship(id) in friendship_actions.js");
    FriendshipApiUtil.fetchFriendship(id, this.receiveSingleFriendship);
  },

  fetchManyFriendships(ids) {
    console.log("fetchManyFriendships(ids) in friendship_actions.js");
    FriendshipApiUtil.fetchManyFriendships(ids, this.receiveManyFriendships);
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
      friendships: friendships
    });
  }

  // removedFriendship(friendship) {
  //   console.log('in removedFriendship(friendship) in friendship_actions.js');
  //   console.log(friendship);
  //   AppDispatcher.dispatch({
  //     actionType: FriendshipConstants.REMOVED_FRIENDSHIP,
  //     friendship: friendship
  //   });
  // }
};

module.exports = FriendshipActions;
