"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const NewsfeedConstants = require('../constants/newsfeed_constants');
const NewsfeedApiUtil = require('../util/newsfeed_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const NewsfeedActions = {

  fetchNewsfeed(id) {
    // debugger;
    console.log("fetchNewsfeed(id) in newsfeed_actions.js");
    NewsfeedApiUtil.fetchNewsfeed(id, this.receiveNewsfeed);
  },

  receiveNewsfeed(newsfeed) {
    console.log("receiveNewsfeed(newsfeed) in newsfeed_actions.jsx");
    console.log(newsfeed);

    AppDispatcher.dispatch({
      actionType: NewsfeedConstants.UPDATE_NEWSFEED,
      newsfeed: newsfeed
    });
  }

};

module.exports = NewsfeedActions;
