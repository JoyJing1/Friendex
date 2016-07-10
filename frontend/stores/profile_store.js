const Store            = require('flux/utils').Store;

const AppDispatcher    = require('../dispatcher/dispatcher.js')
    , ProfileConstants = require('../constants/profile_constants');

let _profile = {};

const ProfileStore = new Store(AppDispatcher);

const _setProfile = function(profile) {
  // console.log("set _profile = profile in profile_store.js");
  _profile = profile;
};

ProfileStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case ProfileConstants.UPDATE_PROFILE:
      _setProfile(payload.profile);
      ProfileStore.__emitChange();
      break;
  }
};

ProfileStore.currentProfile = function() {
  return _profile;
};

module.exports = ProfileStore;
