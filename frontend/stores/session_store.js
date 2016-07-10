"use strict";

const Store              = require('flux/utils').Store;

const AppDispatcher      = require('../dispatcher/dispatcher.js')
      , ProfileConstants = require('../constants/profile_constants')
      , SessionConstants = require('../constants/session_constants');

let _currentUser = {};
let _currentUserHasBeenFetched = false;
let _currentUserProfile = {};

const SessionStore = new Store(AppDispatcher);

const _login = function(currentUser) {
  // console.log("_login in session_store.js");
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
  window.currentUser = currentUser;
};

const _logout = function() {
  // console.log("_logout in session_store.js");
  _currentUser = {};
  _currentUserHasBeenFetched = true;
  window.currentUser = {};
};

SessionStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
    	_logout();
      SessionStore.__emitChange();
      break;
    case ProfileConstants.UPDATE_CURRENT_USER_PROFILE:
      // console.log('ProfileConstants.UPDATE_CURRENT_USER_PROFILE in session_store.js');
      _currentUserProfile = payload.profile;
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.currentUserProfile = function() {
  // console.log('SessionStore.currentUserProfile in session_store.js');
  return Object.assign({}, _currentUserProfile);
};

SessionStore.currentUserHasBeenFetched = function () {
  return Boolean(_currentUserHasBeenFetched);
};

SessionStore.isUserLoggedIn = function() {
  return Boolean(_currentUser.id);
};

module.exports = SessionStore;
