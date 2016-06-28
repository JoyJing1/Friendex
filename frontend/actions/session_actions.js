"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const SessionActions = {

  signUp(formData){
    console.log("signUp(formData) in session_actions.js");
    SessionApiUtil.signUp(
      formData,
      SessionActions.receiveCurrentUser,
      //Redirect to continue adding profile info
      SessionActions.redirectToProfile,
      ErrorActions.setErrors);
  },

  redirectToProfile(id) {
    hashHistory.push(`/users/${id}`);
  },

  logIn(formData){
    console.log("logIn(formData) in session_actions.js");
    SessionApiUtil.logIn(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  logOut() {
    SessionApiUtil.logOut(SessionActions.removeCurrentUser);

  },

  fetchCurrentUser(complete){
    SessionApiUtil.fetchCurrentUser(
      SessionActions.receiveCurrentUser, complete);
  },

  receiveCurrentUser(currentUser) {
    console.log("receiveCurrentUser(currentUser) in session_actions.js");
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
    // hashHistory.push("/login");
  }

};

module.exports = SessionActions;
