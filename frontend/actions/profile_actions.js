"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const ProfileConstants = require('../constants/profile_constants');
const ProfileApiUtil = require('../util/profile_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../stores/session_store');

const ProfileActions = {
  fetchSingleProfile(id) {
    // console.log("fetchSingleProfile(id) in profile_actions.js");
    // console.log(id);
    ProfileApiUtil.fetchProfile(id, this.receiveSingleProfile);
  },

  updateProfile(profile) {
    // console.log("updateProfile(profile) in profile_actions.jsx");
    ProfileApiUtil.updateProfile(profile, this.receiveSingleProfile);
  },

  fetchCurrentUserProfile() {
    // console.log("fetchCurrentUserProfile(id) in profile_actions.js");
    let currentUser = SessionStore.currentUser();
    if (currentUser) {
      ProfileApiUtil.fetchProfile(currentUser.profile_id, this.receiveCurrentUserProfile);
    }
  },

  receiveSingleProfile(profile) {
    // console.log('receiveSingleProfile(profile) in profile_actions.js');
    AppDispatcher.dispatch({
      actionType: ProfileConstants.UPDATE_PROFILE,
      profile: profile
    });
  },

  receiveCurrentUserProfile(profile) {
    // console.log('receiveCurrentUserProfile(profile) in profile_actions.js');
    // console.log(profile);
    AppDispatcher.dispatch({
      actionType: ProfileConstants.UPDATE_CURRENT_USER_PROFILE,
      profile: profile
    });
  }
};

module.exports = ProfileActions;
