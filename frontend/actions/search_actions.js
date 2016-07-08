"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const SearchConstants = require('../constants/search_constants');
const SearchApiUtil = require('../util/search_api_util');

const SearchActions = {
  fetchMatches(query) {
    // console.log("fetchMatches(query) in search_actions.js");
    SearchApiUtil.fetchMatches(query, this.receiveMatches);
  },

  receiveMatches(matches) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.UPDATE_SEARCH_RESULTS,
      matches: matches
    });
  }
};

module.exports = SearchActions;
