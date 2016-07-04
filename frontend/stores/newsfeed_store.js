const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const NewsfeedConstants = require('../constants/newsfeed_constants');

let _newsfeed = [];

const NewsfeedStore = new Store(AppDispatcher);

NewsfeedStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case NewsfeedConstants.UPDATE_NEWSFEED:
      _updateNewsfeed(payload.newsfeed);
      NewsfeedStore.__emitChange();
      break;
  }
};

function _updateNewsfeed(newsfeed) {
  _newsfeed = newsfeed;
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
  return _newsfeed.slice();
};

module.exports = NewsfeedStore;
