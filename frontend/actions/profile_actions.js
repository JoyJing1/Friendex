"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const ProfileConstants = require('../constants/session_constants');
const ProfileApiUtil = require('../util/profile_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const ProfileActions = {
  createProfile(formData){
    console.log("createProfile(formData) in profile_actions.js");
    ProfileApiUtil.createProfile(
      formData,
      ErrorActions.setErrors);
  }
};

module.exports = ProfileActions;
