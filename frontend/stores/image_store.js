"use strict";

const Store          = require('flux/utils').Store;

const AppDispatcher  = require('../dispatcher/dispatcher.js')
    , ImageConstants = require('../constants/image_constants');

let _images = [];

const ImageStore = new Store(AppDispatcher);

ImageStore.__onDispatch = payload => {
  console.log("ImageStore.__onDispatch in image_store.js");
  console.log(payload);
  switch(payload.actionType) {
    case ImageConstants.UPDATE_IMAGE:
      _updateImage(payload.image);
      ImageStore.__emitChange();
      break;
    case ImageConstants.UPDATE_IMAGES:
      _images = payload.images;
      ImageStore.__emitChange();
      break;
    case ImageConstants.REMOVED_IMAGE:
      _removeImage(payload.image);
      ImageStore.__emitChange();
      break;
  }
};

function _updateImage(image) {
  console.log("_updateImage(image) in image_store.js");
  let imageIdx = -1;
  _images.forEach( (img, i) => {
    if (img.id === image.id) {
      imageIdx = i;
    }
  });

  if (imageIdx < 0) {
    _images.unshift(image);
  } else {
    _images[imageIdx] = image;
  }
  console.log(_images);
}


function _removeImage(image) {
  let imageIdx = -1;
  _images.forEach( (img, i) => {
    if (img.id === image.id) {
      imageIdx = i;
    }
  });

  if (imageIdx >= 0) {
    _images.splice(imageIdx, 1);
    console.log("_removeImage(image) in image_store.js - had to remove from store explicitly");
  }
}

ImageStore.find = function(id) {
  const imageIdx = _images.indexOf(parseInt(id));
  return _images[imageIdx];
};

ImageStore.all = function() {
  return _images.slice();
};

module.exports = ImageStore;
