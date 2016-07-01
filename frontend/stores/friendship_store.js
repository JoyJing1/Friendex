const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const FriendshipConstants = require('../constants/friendship_constants');
const SessionStore = require('./session_store');

let _friends = {};
let _friendRequestsReceived = {};
let _friendRequestsSent = {};

const FriendshipStore = new Store(AppDispatcher);

FriendshipStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case FriendshipConstants.UPDATE_FRIENDSHIP:
      console.log('UPDATE_FRIENDSHIP in friendship_store.js');
      _updateFriendship(payload.friendship);
      FriendshipStore.__emitChange();
      break;
    case FriendshipConstants.UPDATE_FRIENDSHIPS:
      console.log('UPDATE_FRIENDSHIPS in friendship_store.js');
      console.log(payload);
      _resetFriendships(payload);
      FriendshipStore.__emitChange();
      break;
  }
};

function _resetFriendships(payload) {
  _friends = {};
  _friendRequestsReceived = {};
  _friendRequestsSent = {};

  console.log("_resetFriendship(payload) in friendship_store.js");
  console.log(payload);

  payload.friends.forEach( friend => {
    _friends[friend.id] = friend;
  });

  payload.friend_requests_received.forEach( friend => {
    _friendRequestsReceived[friend.id] = friend;
  });

  payload.friend_requests_sent.forEach( friend => {
    _friendRequestsSent[friend.id] = friend;
  });

  console.log('saved friend_request payload to store');
  console.log(_friends);
  console.log(_friendRequestsReceived);
  console.log(_friendRequestsSent);

  // _friends = payload.friends;
  // debugger;
  // _friendRequestsReceived = payload.friend_requests_received;
  // _friendRequestsSent = payload.friend_requests_sent;
}

function _updateFriendship(friendship) {
  "_updateFriendship in friendship_store.js";
  console.log(friendship);
  if (friendship.status === "accepted") {
    _friends[friendship.id] = friendship;
  } else if (friendship.status === "denied") {
    delete _friendRequestsReceived[friendship.id];
    delete _friendRequestsSent[friendship.id];
  } else if (friendship.status === "pending") {
    if (SessionStore.currentUser().id === friendship.requestor_id) {
      _friendRequestsSent[friendship.id] = friendship;
    } else if (SessionStore.currentUser().id === friendship.receiver_id) {
      _friendRequestsReceived[friendship.id] = friendship;
    } else {
      console.log('pending friendrequest but not related with current_user');
    }
  } else {
    console.log('friendship status not accepted, denied, or pending');
  }
}

function _removeFriendship(friendship) {
  delete _friends[friendship.id];
  delete _friendRequestsReceived[friendship.id];
  delete _friendRequestsSent[friendship.id];
}

FriendshipStore.find = function(id) {
  return _friends[id] || _friendRequestsReceived[id] || _friendRequestsSent[id];
};

FriendshipStore.friends = function() {
  console.log('pulling FriendshipStore.friends in friendship_store.js');
  console.log(_friends);
  let friends = [];

  for (let id in _friends) {
    if (_friends.hasOwnProperty(id)) {
      friends.push(_friends[id]);
    }
  }
  return friends;
};

FriendshipStore.friendRequestsReceived = function() {
  console.log('pulling FriendshipStore.friendRequestsReceived in friendship_store.js');
  console.log(_friendRequestsReceived);
  let friendRequestsReceived = [];

  for (let id in _friendRequestsReceived) {
    if (_friendRequestsReceived.hasOwnProperty(id)) {
      friendRequestsReceived.push(_friendRequestsReceived[id]);
    }
  }
  return friendRequestsReceived;
};

FriendshipStore.friendRequestsSent = function() {
  console.log('pulling FriendshipStore.friendRequestsSent in friendship_store.js');
  console.log(_friendRequestsSent);
  let friendRequestsSent = [];

  for (let id in _friendRequestsSent) {
    if (_friendRequestsSent.hasOwnProperty(id)) {
      friendRequestsSent.push(_friendRequestsSent[id]);
    }
  }
  return friendRequestsSent;
};

module.exports = FriendshipStore;
