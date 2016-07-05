const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const NewsfeedConstants = require('../constants/newsfeed_constants');
const PostConstants = require('../constants/post_constants');
const ImageConstants = require('../constants/image_constants');

let _newsfeed = [];

const NewsfeedStore = new Store(AppDispatcher);

NewsfeedStore.__onDispatch = payload => {
  console.log("NewsfeedStore.__onDispatch");
  // debugger;

  switch(payload.actionType) {
    case NewsfeedConstants.UPDATE_NEWSFEED:
      console.log("UPDATE_NEWSFEED in NewsfeedStore");
      // debugger; // Only getting 2 friendship
      _updateNewsfeed(payload.newsfeed);
      NewsfeedStore.__emitChange();
      break;
    case PostConstants.UPDATE_POST:
      let post = payload.post;
      post["type"] = "post";
      _updateItem(post);
      NewsfeedStore.__emitChange();
      break;
    case PostConstants.REMOVED_POST:
      _removeItem(payload.post);
      NewsfeedStore.__emitChange();
      break;
    case ImageConstants.UPDATE_IMAGE:
      console.log("UPDATE_IMAGE in NewsfeedStore");
      // debugger;
      let image = payload.image;
      image["type"] = "image";
      _updateItem(image);
      NewsfeedStore.__emitChange();
      break;
    case ImageConstants.REMOVED_IMAGE:
      _removeItem(payload.image);
      NewsfeedStore.__emitChange();
      break;
  }
};

function _updateNewsfeed(newsfeed) {
  _newsfeed = newsfeed;
}

function _updateItem(item) {
  console.log("_updateItem(item) in image_store.js");
  const idx = _newsfeed.indexOf(item);
  console.log(`idx = ${idx}`);
  if (idx < 0) {
    _newsfeed.unshift(item);
  } else {
    _newsfeed[idx] = item;
  }
  console.log(_newsfeed);
}

function _removeItem(item) {
  const idx = _newsfeed.indexOf(item);
  _newsfeed.splice(idx, 1);
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
