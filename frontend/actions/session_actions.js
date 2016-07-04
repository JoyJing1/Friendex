"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;
const ProfileActions = require('./profile_actions');

const SessionActions = {

  signUp(userData){
    console.log("signUp(userData) in session_actions.js");
    SessionApiUtil.signUp(
      userData,
      (resp) => {
        console.log("inside succesCallback of signUp, in session_actions.js");
        SessionActions.receiveCurrentUser(resp);
        SessionActions._redirectToProfile(resp.id);
      },
      ErrorActions.setErrors);
  },

  _redirectToProfile(id) {
    hashHistory.push(`/users/${id}`);
  },

  logIn(formData){
    console.log("logIn(formData) in session_actions.js");
    SessionApiUtil.logIn(
      formData,
      (resp) => {
        SessionActions.receiveCurrentUser(resp);
        SessionActions._redirectToProfile(resp.id);
      },
      ErrorActions.setErrors);
  },

  logOut() {
    SessionApiUtil.logOut((resp) => {
      SessionActions.removeCurrentUser();
      this._redirectToLogin();
    });
  },

  _redirectToLogin() {
    hashHistory.push(`login`);
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
  }

};

module.exports = SessionActions;
