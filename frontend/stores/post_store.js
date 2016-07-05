const AppDispatcher  = require('../dispatcher/dispatcher.js')
    , CommentConstants = require('../constants/comment_constants')
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
      if (payload.posts instanceof Array) {
        _posts = payload.posts;
        PostStore.__emitChange();
      }
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

    case CommentConstants.UPDATE_COMMENT:
      console.log("CommentConstants.UPDATE_COMMENT in post_store.js");
      let comment = payload.comment;
      _updateComment(comment);
      PostStore.__emitChange();
      break;

    case CommentConstants.REMOVED_COMMENT:
      console.log("CommentConstants.REMOVED_COMMENT in post_store.js");
      _removeComment(payload.comment);
      PostStore.__emitChange();
      break;
  }
};

function _updateComment(comment) {
  if (comment.image_id) {
    const itemIdx = _findItem("image", comment.image_id);
    if (itemIdx >= 0) {
      _posts[itemIdx].comments.push(comment);
    }

  } else if (comment.post_id) {
    const itemIdx = _findItem("post", comment.post_id);
    if (itemIdx >= 0) {
      _posts[itemIdx].comments.push(comment);
    }
  }
}

function _removeComment(comment) {
  if (comment.image_id) {
    const itemIdx = _findItem("image", comment.image_id);
    let item = _posts[itemIdx];

    const commentIdx = item.comments.indexOf(comment);

    if (commentIdx >= 0) {
      item.comments.splice(commentIdx, 1);
      _updateItem(item);
    }

  } else if (comment.post_id) {
    const itemIdx = _findItem("post", comment.post_id);
    let item = _posts[itemIdx];
    const commentIdx = item.comments.indexOf(comment);

    if (commentIdx >= 0) {
      item.comments.splice(commentIdx, 1);
      _updateItem(item);
    }
  }
}

function _findItem(type, id) {
  let idx = -1;
  _posts.forEach( (item, i) => {
    if (item.type === type && item.id === id) {
      idx = i;
    }
  });
  return idx;
}

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
