"use strict";

const FriendshipApiUtil = {
	createFriendship(friendship, success, error) {
    console.log("createFriendship(friendship, success, error) in friendship_api_util.js");
		$.ajax({
			url: `/api/friendships`,
			type: 'POST',
      data: { friendship: friendship },
			success(resp) {
        console.log("successfully created new friendship");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to create a new friendship");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
	},

  updateFriendship(friendship, success, error) {
    console.log("updateFriendship(friendship, success, error) in friendship_api_util.js");
		$.ajax({
			url: `/api/friendships/${friendship.id}`,
			type: 'PATCH',
      data: { friendship: friendship },
			success(resp) {
        console.log("successfully edited friendship");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to create a new friendship");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
	},

  fetchFriendship(id, success, error) {
    console.log("fetchFriendship(id, success, error) in friendship_api_util.js");
		$.ajax({
			url: `/api/friendships/${id}`,
			type: 'GET',
			success(resp) {
        console.log("successfully fetched friendships");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to fetch friendship");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

  fetchManyFriendships(id, success, error) {
    console.log("fetchFriendships(ids, success, error) in friendship_api_util.js");
    $.ajax({
      url: `/api/friendships/`,
      type: 'GET',
      data: { id: id },
      success(resp) {
        console.log("successfully fetched friendships");
        console.log(resp);
        success(resp);
      },
      error(xhr) {
        console.log("failed to fetch friendships");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
  }

};

module.exports = FriendshipApiUtil;
