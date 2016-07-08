"use strict";

const NewsfeedApiUtil = {

  fetchNewsfeed(id, successCallback) {
    // console.log("fetchNewsfeed(id, success, error) in newsfeed_api_util.js");
    $.ajax({
      url: `/api/newsfeed`,
      type: 'GET',
      data: { id: id },
      success(resp) {
        // console.log("successfully pulled newsfeed");
        // console.log(resp);
        successCallback(resp);
      },
      error(xhr) {
        // console.log("failed to pull newsfeed");
        const errors = xhr.responseJSON;
        // console.log(errors);
      }
    });
  }

};

module.exports = NewsfeedApiUtil;
