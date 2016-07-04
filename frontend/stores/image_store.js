const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const ImageConstants = require('../constants/image_constants');

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
  const imageIdx = _images.indexOf(image);
  if (imageIdx <= 0) {
    _images.unshift(image);
  } else {
    _images[imageIdx] = image;
  }
  console.log(_images);
}


function _removeImage(image) {
  const imageIdx = _images.indexOf(image);
  _images.splice(imageIdx, 1);
}

ImageStore.find = function(id) {
  const imageIdx = _images.indexOf(parseInt(id));
  return _images[imageIdx];
};

ImageStore.all = function() {
  return _images.slice();
};

module.exports = ImageStore;
