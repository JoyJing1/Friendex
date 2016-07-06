"use strict";

// const hashHistory = require('react-router').hashHistory;

const AppDispatcher = require('../dispatcher/dispatcher')
    , ErrorActions  = require('./error_actions')
    , LikeConstants = require('../constants/like_constants')
    , LikeApiUtil   = require('../util/like_api_util');

const LikeActions = {
  createLike(like, toggleLikeState) {
    // debugger;
    console.log("createLike(like) in like_actions.js");

    if (like.post_id) {
      LikeApiUtil.createPostLike(like, (resp) => {
        this.receiveSingleLike(resp);
        toggleLikeState();
      });

    } else if (like.image_id) {
      LikeApiUtil.createImageLike(like, (resp) => {
        this.receiveSingleLike(resp);
        toggleLikeState();
      });

    } else if (like.friendship_id) {
      LikeApiUtil.createFriendshipLike(like, (resp) => {
        this.receiveSingleLike(resp);
        toggleLikeState();
      } );
    }
  },

  deleteLike(ids, toggleLikeState) {
    // debugger;
    console.log("deleteLike(id) in like_actions.js");

    if (ids.post_id) {
      LikeApiUtil.deletePostLike(ids, (resp) => {
        LikeActions.removedLike(resp);
        toggleLikeState();
        console.log("PostLike successfully deleted");
      });

    } else if (ids.image_id) {
      LikeApiUtil.deleteImageLike(ids, (resp) => {
        LikeActions.removedLike(resp);
        toggleLikeState();
        console.log("ImageLike successfully deleted");
      });

    } else if (ids.friendship_id) {
      LikeApiUtil.deleteFriendshipLike(ids, (resp) => {
        LikeActions.removedLike(resp);
        toggleLikeState();
        console.log("FriendshipLike successfully deleted");
      });
    }
  },

  receiveSingleLike(like) {
    console.log("receiveSingleLike(like) in like_actions.js");
    AppDispatcher.dispatch({
      actionType: LikeConstants.ADDED_LIKE,
      like: like
    });
  },

  removedLike(like) {
    console.log('in removedLike(like) in like_actions.js');
    console.log(like);
    AppDispatcher.dispatch({
      actionType: LikeConstants.REMOVED_LIKE,
      like: like
    });
  }
};

module.exports = LikeActions;
