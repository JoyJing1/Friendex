"use strict";

const LikeApiUtil = {

	createPostLike(post_id, success, error) {
    console.log("createPostLike(like, success, error) in like_api_util.js");
    // debugger;
    $.ajax({
      url: `/api/likes`,
      method: "POST",
      data: post_id,
      success(resp) {
        console.log("successfully created post_like in like_api_util.js");
        success(resp);
      },
      error(xhr) {
        console.log("failed to create post_like in like_api_util.js");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
	},

  deletePostLike(post_id, success, error) {
    console.log("deletePostLike(id, success, error) in like_api_util.js");
    // debugger;

		$.ajax({
			url: `/api/likes/${post_id.post_id}`,
			type: 'DELETE',
      data: post_id,
			success(resp) {
        console.log("successfully deleted post_like");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to delete post_like");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

	createImageLike(image_id, success, error) {
    console.log("createImageLike(image_id, success, error) in like_api_util.js");
    // debugger;

    $.ajax({
      url: `/api/likes`,
      method: "POST",
      data: image_id,
      success(resp) {
        console.log("successfully created image_like in like_api_util.js");
        console.log(resp);
        success(resp);
      },
      error(xhr) {
        console.log("failed to create image_like in like_api_util.js");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
	},

  deleteImageLike(image_id, success, error) {
    console.log("deleteImageLike(id, success, error) in like_api_util.js");

		$.ajax({
			url: `/api/likes/${image_id.image_id}`,
			type: 'DELETE',
      data: image_id,
			success(resp) {
        console.log("successfully deleted image_like");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to delete image_like");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

	createFriendshipLike(friendship_id, success, error) {
    console.log("createFriendshipLike(like, success, error) in like_api_util.js");

    $.ajax({
      url: `/api/likes`,
      method: "POST",
      data: friendship_id,
      success(resp) {
        console.log("successfully created friendship_like in like_api_util.js");
        console.log(resp);
        // debugger;
        success(resp);
      },
      error(xhr) {
        console.log("failed to create friendship_like in like_api_util.js");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
	},

  deleteFriendshipLike(friendship_id, success, error) {
    console.log("deleteFriendshipLike(id, success, error) in like_api_util.js");

		$.ajax({
			url: `/api/likes/${friendship_id.friendship_id}`,
			type: 'DELETE',
      data: friendship_id,
			success(resp) {
        console.log("successfully deleted friendship_like");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to delete friendship_like");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

};

module.exports = LikeApiUtil;
