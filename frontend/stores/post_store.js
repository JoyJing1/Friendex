const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');
const ImageConstants = require('../constants/image_constants');

let _posts = [];

const PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = payload => {
  console.log("PostStore.__onDispatch in post_store.js");
  switch(payload.actionType) {
    case PostConstants.UPDATE_POST:
      let post = payload.post;
      post["type"] = "text";
      _updateItem(post);
      PostStore.__emitChange();
      break;
    case PostConstants.UPDATE_POSTS:
      _posts = payload.posts;
      PostStore.__emitChange();
      break;
    case PostConstants.REMOVED_POST:
      _removeItem(payload.post);
      PostStore.__emitChange();
      break;
    case ImageConstants.UPDATE_IMAGE:
      let image = payload.image;
      image["type"] = "photo";
      _updateItem(image);
      PostStore.__emitChange();
      break;
    case ImageConstants.REMOVED_IMAGE:
      _removeItem(payload.image);
      PostStore.__emitChange();
      break;
  }
};

function _updateItem(item) {
  console.log("_updateItem(item) in image_store.js");
  const idx = _posts.indexOf(item);
  console.log(`idx = ${idx}`);
  if (idx < 0) {
    _posts.unshift(item);
  } else {
    _posts[idx] = item;
  }
  console.log(_posts);
}

function _removeItem(item) {
  const idx = _posts.indexOf(item);
  _posts.splice(idx, 1);
}

PostStore.find = function(id) {
  let post = {};

  if (typeof id === "string") {
    id = parseInt(id);
  }

  for(let i = 0; i < _posts.length; i++) {
    let currPost = _posts[i];
    if (currPost.id === id) {
      post = currPost;
    }
  }
  return post;
};

PostStore.all = function() {
  return _posts.slice();
};

module.exports = PostStore;
