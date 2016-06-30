const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');

let _posts = [];

const PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case PostConstants.UPDATE_POST:
      _updatePost(payload.post);
      PostStore.__emitChange();
      break;
    case PostConstants.UPDATE_POSTS:
      _posts = payload.posts;
      PostStore.__emitChange();
      break;
  }
};

function _updatePost(post) {
  for(let i = 0; i < _posts.length; i++) {
    if (_posts[i].id === post.id) {
      _posts[i] = post;
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

// Will need to write a method to pull all posts based on a profile_id
// 1st function -- only posts to a receiver_id
// 2nd function - all posts where user_id === author_id or receiver_id
// Write 2 different functions
// Write 3rd function combines the other two to get full list

module.exports = PostStore;
