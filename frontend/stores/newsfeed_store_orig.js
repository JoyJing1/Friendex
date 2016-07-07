"use strict";

const Store             = require('flux/utils').Store;

const AppDispatcher     = require('../dispatcher/dispatcher.js')
    , CommentConstants  = require('../constants/comment_constants')
    , ImageConstants    = require('../constants/image_constants')
    , LikeConstants     = require('../constants/like_constants')
    , NewsfeedConstants = require('../constants/newsfeed_constants')
    , PostConstants     = require('../constants/post_constants');

let _newsfeed = [];

const NewsfeedStore = new Store(AppDispatcher);

NewsfeedStore.__onDispatch = payload => {
  console.log("NewsfeedStore.__onDispatch");
  console.log(_newsfeed);
  console.log("payload in newsfeed_store.js");
  console.log(payload);
  debugger;

  switch(payload.actionType) {
    case NewsfeedConstants.UPDATE_NEWSFEED:
      console.log("UPDATE_NEWSFEED in NewsfeedStore");
      _updateNewsfeed(payload.newsfeed);
      NewsfeedStore.__emitChange();
      break;

    case PostConstants.UPDATE_POST:
    console.log("PostConstants.UPDATE_POST in newsfeed_store.js");
      let post = payload.post;
      post["type"] = "post";
      _updateItem(post);
      NewsfeedStore.__emitChange();
      break;

    case PostConstants.REMOVED_POST:
      console.log("PostConstants.REMOVED_POST in newsfeed_store.js");
      _removeItem(payload.post);
      NewsfeedStore.__emitChange();
      break;

    case ImageConstants.UPDATE_IMAGE:
      console.log("UPDATE_IMAGE in NewsfeedStore");
      let image = payload.image;
      image["type"] = "image";
      _updateItem(image);
      NewsfeedStore.__emitChange();
      break;

    case ImageConstants.REMOVED_IMAGE:
      console.log("REMOVED_IMAGE in NewsfeedStore");
      _removeItem(payload.image);
      NewsfeedStore.__emitChange();
      break;

    case CommentConstants.UPDATE_COMMENT:
      console.log("CommentConstants.UPDATE_COMMENT in newsfeed_store.js");
      let comment = payload.comment;
      _updateComment(comment);
      NewsfeedStore.__emitChange();
      break;

    case CommentConstants.REMOVED_COMMENT:
      console.log("CommentConstants.REMOVED_COMMENT in newsfeed_store.js");
      _removeComment(payload.comment);
      NewsfeedStore.__emitChange();
      break;

    case LikeConstants.ADDED_LIKE:
      console.log("LikeConstants.ADDED_LIKE in newsfeed_store.js");
      console.log(_newsfeed);
      _addLike(payload.like);
      NewsfeedStore.__emitChange();
      break;

    case LikeConstants.REMOVED_LIKE:
      console.log("LikeConstants.REMOVED_LIKE in newsfeed_store.js");
      _removeLike(payload.like);
      NewsfeedStore.__emitChange();
      break;
  }
};

function _addLike(like) {
  console.log("top of _addLike(like) in newsfeed_store.jsx");
  console.log(_newsfeed);
  // debugger;
  let itemIdx = -1;
  if (like.image_id) {
    itemIdx = _findItem("image", like.image_id);
    if (itemIdx >= 0) {
      _newsfeed[itemIdx].likes.push(like);
    }

  } else if (like.post_id) {
    // Not assigning itemIdx properly
    itemIdx = _findItem("post", like.post_id);
    if (itemIdx >= 0) {
      // debugger;

      // COMMENT BACK IN!!!!!!

      console.log(`itemIdx = ${itemIdx}`);
      console.log("num_likes before pushing like onto _newsfeed");
      console.log(_newsfeed[itemIdx].likes);
      console.log("full _newsfeed before pushing");
      console.log(_newsfeed);

      // debugger;
      _newsfeed[itemIdx].likes.push(like);
      console.log("num_likes after pushing like onto _newsfeed");

      // console.log("before imp_likes");
      // // console.log(_newsfeed[itemIdx].likes)
      // let imp_likes = _newsfeed[itemIdx].likes;
      // console.log("after setting imp_likes");
      //
      //
      // console.log(_newsfeed[itemIdx].likes);
      // imp_likes.push(like);
      // console.log("after imp_likes.push(like)");
      //
      // console.log(_newsfeed[itemIdx].likes);
      //
      //
      // console.log("num_likes AFTER pushing, _addLike(like) in newsfeed_store.jsx");
      // debugger;
      console.log(_newsfeed[itemIdx].likes);
      console.log("full _newsfeed in newsfeed_store.jsx");
      console.log(_newsfeed);
    }

  } else if (like.friendship_id) {
    itemIdx = _findItem("friendship", like.friendship_id);
    if (itemIdx >= 0) {
      _newsfeed[itemIdx].likes.push(like);
    }
  }

}

function _removeLike(like) {
  // debugger;
  console.log("_removeLike(like) in newsfeed_store.js");
  console.log(_newsfeed);
  let itemIdx = -1;
  if (like.image_id) {
    itemIdx = _findItem("image", like.image_id);
    if (itemIdx >= 0) {
      let likeIdx = _newsfeed[itemIdx].likes.indexOf(like);
      _newsfeed[itemIdx].likes.splice(likeIdx, 1);
    }

  } else if (like.post_id) {
    itemIdx = _findItem("post", like.post_id);
    if (itemIdx >= 0) {
      let likeIdx = -1;
      _newsfeed[itemIdx].likes.forEach( (el, i) => {
        if (like.id === el.id) {
          likeIdx = i;
        }
      });
      // let likeIdx = _newsfeed[itemIdx].likes.indexOf(like);
      _newsfeed[itemIdx].likes.splice(likeIdx, 1);
    }

  } else if (like.friendship_id) {
    itemIdx = _findItem("friendship", like.friendship_id);
    if (itemIdx >= 0) {
      let likeIdx = _newsfeed[itemIdx].likes.indexOf(like);
      _newsfeed[itemIdx].likes.splice(likeIdx, 1);
    }
  }

}

function _updateComment(comment) {
  if (comment.image_id) {
    const itemIdx = _findItem("image", comment.image_id);

    if (itemIdx >= 0) {
      _newsfeed[itemIdx].comments.push(comment);
    }

  } else if (comment.post_id) {
    const itemIdx = _findItem("post", comment.post_id);
    if (itemIdx >= 0) {
      _newsfeed[itemIdx].comments.push(comment);
    }

  } else if (comment.friendship_id) {
    const itemIdx = _findItem("friendship", comment.friendship_id);
    if (itemIdx >= 0) {
      _newsfeed[itemIdx].comments.push(comment);
    }
  }
}

function _removeComment(comment) {
  if (comment.image_id) {
    const itemIdx = _findItem("image", comment.image_id);
    let item = _newsfeed[itemIdx];

    const commentIdx = item.comments.indexOf(comment);

    item.comments.splice(commentIdx, 1);
    _updateItem(item);

  } else if (comment.post_id) {
    const itemIdx = _findItem("post", comment.post_id);
    let item = _newsfeed[itemIdx];
    const commentIdx = item.comments.indexOf(comment);

    item.comments.splice(commentIdx, 1);
    _updateItem(item);

  } else if (comment.friendship_id) {
    const itemIdx = _findItem("friendship", comment.friendship_id);
    let item = _newsfeed[itemIdx];
    const commentIdx = item.comments.indexOf(comment);

    item.comments.splice(commentIdx, 1);
    _updateItem(item);
  }
}

function _findItem(type, id) {
  console.log("_findItem in newsfeed_store.js");
  let idx = -1;
  _newsfeed.forEach( (item, i) => {
    if (item.type === type && item.id === id) {
      idx = i;
    }
  });
  return idx;
}

function _updateNewsfeed(newsfeed) {
  // debugger;
  console.log("_updateNewsfeed in newsfeed_store.js");
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
  console.log("in NewsfeedStore.all(). Current value of _newsfeed: ");
  console.log(_newsfeed);
  return _newsfeed.slice();
};

module.exports = NewsfeedStore;
