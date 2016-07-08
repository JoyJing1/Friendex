const Store           = require('flux/utils').Store;

const AppDispatcher   = require('../dispatcher/dispatcher.js')
    , SearchConstants = require('../constants/search_constants');

let _matches = [];

const SearchStore = new Store(AppDispatcher);

const _setSearch = function(matches) {
  // console.log("set _search = search in search_store.js");
  _matches = matches;
};

SearchStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case SearchConstants.UPDATE_SEARCH_RESULTS:
      resetMatches(payload.matches);
      SearchStore.__emitChange();
      break;
  }
};

function resetMatches(matches) {
  if (matches) {
    _matches = matches;
    // console.log('resetMatches(matches) in search_store');
    // console.log(matches);
  }
}

SearchStore.matches = function() {
  return _matches.slice();
};

module.exports = SearchStore;
