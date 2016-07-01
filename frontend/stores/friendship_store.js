const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const FriendshipConstants = require('../constants/friendship_constants');

let _friendships = {};

const FriendshipStore = new Store(AppDispatcher);

FriendshipStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case FriendshipConstants.UPDATE_FRIENDSHIP:
      _updateFriendship(payload.friendship);
      FriendshipStore.__emitChange();
      break;
    case FriendshipConstants.UPDATE_FRIENDSHIPS:
      _friendships = payload.friendships;
      FriendshipStore.__emitChange();
      break;
  }
};

function _updateFriendship(friendship) {
  _friendships[friendship.id] = friendship;
}

function _removeFriendship(friendship) {
  delete _friendships[friendship.id];
}

FriendshipStore.find = function(id) {
  return _friendships[id];
};

FriendshipStore.all = function() {
  let friendships = [];

  for (let id in _friendships) {
    if (_friendships.hasOwnProperty(id)) {
      friendships.push(_friendships[id]);
    }
  }
  return friendships;
};

module.exports = FriendshipStore;
