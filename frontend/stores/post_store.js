const AppDispatcher  = require('../dispatcher/dispatcher.js')
    , ImageConstants = require('../constants/image_constants')
    , PostConstants  = require('../constants/post_constants')
    , Store          = require('flux/utils').Store;

let _posts = [];

const PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = payload => {
  console.log("PostStore.__onDispatch in post_store.js");
  switch(payload.actionType) {
    case PostConstants.UPDATE_POST:
      let post = payload.post;
      post["type"] = "post";
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
      image["type"] = "image";
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
  let idx = -1;
  _posts.forEach( (post, i) => {
    if (post.id === item.id) {
      idx = i;
    }
  });

  if (idx >= 0) {
    _posts.splice(idx, 1);
    console.log("_removeItem(item) in post_store.js - had to remove from store explicitly");
  }
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
