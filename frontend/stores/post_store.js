const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');

let _posts = [];

const PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = payload => {
  console.log("PostStore.__onDispatch in post_store.js");
  switch(payload.actionType) {
    case PostConstants.UPDATE_POST:
      _updatePost(payload.post);
      PostStore.__emitChange();
      break;
    case PostConstants.UPDATE_POSTS:
      _posts = payload.posts;
      PostStore.__emitChange();
      break;
    case PostConstants.REMOVED_POST:
      _removePost(payload.post);
      PostStore.__emitChange();
      break;
  }
};

function _updatePost(post) {
  console.log("_updatePost(post) in post_store.js");
  let newPost = true;
  for(let i = 0; i < _posts.length; i++) {
    if (_posts[i].id === post.id) {
      _posts[i] = post;
      newPost = false;
    }
  }
  if (newPost) {
    _posts.unshift(post);
  }
  console.log(_posts);
}

function _removePost(post) {
  for(let i = 0; i < _posts.length; i++) {
    if (_posts[i].id === post.id) {
      _posts = _posts.slice(0, i).concat(_posts.slice(i+1));
    }
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
