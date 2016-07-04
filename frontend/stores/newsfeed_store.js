const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const NewsfeedConstants = require('../constants/newsfeed_constants');
const PostConstants = require('../constants/post_constants');

let _newsfeed = [];

const NewsfeedStore = new Store(AppDispatcher);

NewsfeedStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case NewsfeedConstants.UPDATE_NEWSFEED:
      _updateNewsfeed(payload.newsfeed);
      NewsfeedStore.__emitChange();
      break;
    case PostConstants.UPDATE_POST:
      _updatePost(payload.post);
      NewsfeedStore.__emitChange();
      break;
    case PostConstants.REMOVED_POST:
      _removePost(payload.post);
      NewsfeedStore.__emitChange();
      break;
  }
};

function _updateNewsfeed(newsfeed) {
  _newsfeed = newsfeed;
}

function _updatePost(post) {
  console.log("_updatePost(post) in newsfeed_store.js");
  let newPost = true;
  for(let i = 0; i < _newsfeed.length; i++) {
    if (_newsfeed[i].type === "post" && _newsfeed[i].id === post.id) {
      _newsfeed[i] = post;
      newPost = false;
    }
  }
  if (newPost) {
    post["type"] = "post";
    _newsfeed.unshift(post);
  }
  console.log(_newsfeed);
}

function _removePost(post) {
  for(let i = 0; i < _newsfeed.length; i++) {
    if (_newsfeed[i].type === "post" && _newsfeed[i].id === post.id) {
      _newsfeed = _newsfeed.slice(0, i).concat(_newsfeed.slice(i+1));
    }
  }
}

NewsfeedStore.find = function(type, id) {
  let news = {};

  if (typeof id === "string") {
    id = parseInt(id);
  }

  for(let i = 0; i < _newsfeed.length; i++) {
    let currNews = _newsfeed[i];
    if (currNews.type === type && currNews.id === id) {
      news = currNews;
    }
  }
  return news;
};

NewsfeedStore.all = function() {
  return _newsfeed.slice();
};

module.exports = NewsfeedStore;
