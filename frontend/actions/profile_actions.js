"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const ProfileConstants = require('../constants/profile_constants');
const ProfileApiUtil = require('../util/profile_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const ProfileActions = {
  fetchSingleProfile(id) {
    console.log("fetchSingleProfile(id) in profile_actions.js");
    ProfileApiUtil.fetchProfile(id, this.receiveSingleProfile);
  },

  receiveSingleProfile(profile) {
    AppDispatcher.dispatch({
      actionType: ProfileConstants.UPDATE_PROFILE,
      profile: profile
    });
  }
};

module.exports = ProfileActions;
