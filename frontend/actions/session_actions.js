"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;
const ProfileActions = require('./profile_actions');
const SessionStore = require('../stores/session_store');


const SessionActions = {

  signUp(userData){
    console.log("signUp(userData) in session_actions.js");
    SessionApiUtil.signUp(
      userData,
      (resp) => {
        console.log("inside succesCallback of signUp, in session_actions.js");
        SessionActions.receiveCurrentUser(resp);
        SessionActions._redirectToNewsfeed(resp.id);
      },
      ErrorActions.setErrors);
  },

  _redirectToNewsfeed() {
    hashHistory.push(`/`);
  },

  _redirectToLogin() {
    console.log("_redirectToLogin in session_actions.js");
    hashHistory.push(`/login`);
  },

  _redirectToProfile(id) {
    hashHistory.push(`/users/${id}`);
  },

  _redirectToTimeline() {
    hashHistory.push(`/users/${SessionStore.currentUser().id}`);
  },

  logIn(formData, openModal){
    console.log("logIn(formData) in session_actions.js");
    SessionApiUtil.logIn(
      formData,
      (resp) => {
        SessionActions.receiveCurrentUser(resp);
        // SessionActions._redirectToTimeline();
      },
      (resp) => {
        ErrorActions.setErrors;
        openModal();
      });
  },

  logOut() {
    SessionApiUtil.logOut((resp) => {
      console.log("in success callback of SessionApiUtil.logOut in session_actions.js");
      SessionActions.removeCurrentUser();
      this._redirectToLogin();
    });
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
