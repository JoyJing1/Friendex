"use strict";

const hashHistory = require('react-router').hashHistory;

const AppDispatcher = require('../dispatcher/dispatcher')
    , ErrorActions = require('./error_actions')
    , ImageApiUtil = require('../util/image_api_util')
    , ImageConstants = require('../constants/image_constants');

const ImageActions = {
  createImage(image) {
    // console.log("createImage(image) in image_actions.js");
    ImageApiUtil.createImage(image, (resp) => {
      this.receiveSingleImage(resp);
    });
  },

  deleteImage(id) {
    // console.log("deleteImage(id) in image_actions.js");
    ImageApiUtil.deleteImage(id, (resp) => {
      ImageActions.removedImage(resp);
      // console.log("Image successfully deleted");
    });
  },

  fetchManyImages(userId) {
    // console.log("fetchManyImages(userId) in image_actions.js");
    ImageApiUtil.fetchManyImages(userId, this.receiveManyImages);
  },

  receiveSingleImage(image) {
    // console.log("receiveSingleImage(image) in image_actions.js");
    AppDispatcher.dispatch({
      actionType: ImageConstants.UPDATE_IMAGE,
      image: image
    });
  },

  receiveManyImages(images) {
    AppDispatcher.dispatch({
      actionType: ImageConstants.UPDATE_IMAGES,
      images: images
    });
  },

  removedImage(image) {
    // console.log('in removedImage(image) in image_actions.js');
    AppDispatcher.dispatch({
      actionType: ImageConstants.REMOVED_IMAGE,
      image: image
    });
  }
};

module.exports = ImageActions;
