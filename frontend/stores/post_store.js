const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');

let _posts = {};

const PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case PostConstants.UPDATE_POST:
      _updatePost(payload.post);
      PostStore.__emitChange();
      break;
    case PostConstants.UPDATE_POSTS:
      _resetPosts(payload.posts);
      PostStore.__emitChange();
      break;
  }
};

function _resetPosts(posts) {
  _posts = {};
  posts.forEach(post => {
    _posts[post.id] = post;
  });
}

function _updatePost(post) {
  _posts[post.id] = post;
}

PostStore.find = function(id) {
  if (typeof id === "string") {
    id = parseInt(id);
  }

  return _posts[id];
};

PostStore.all = function() {
  let posts = [];

  for (let pId in _posts) {
    if (_posts.hasOwnProperty(pId)) {
      posts.push(_posts[pId]);
    }
  }
  return posts;
};

// Will need to write a method to pull all posts based on a profile_id
// 1st function -- only posts to a receiver_id
// 2nd function - all posts where user_id === author_id or receiver_id
// Write 2 different functions
// Write 3rd function combines the other two to get full list

module.exports = PostStore;
