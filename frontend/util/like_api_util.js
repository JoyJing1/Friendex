"use strict";

const LikeApiUtil = {

	createPostLike(like, success, error) {
    console.log("createPostLike(like, success, error) in like_api_util.js");

    $.ajax({
      url: `/api/posts/${like.post_id}/likes`,
      method: "POST",
      data: { post_like: like },
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

  deletePostLike(ids, success, error) {
    console.log("deletePostLike(id, success, error) in like_api_util.js");

		$.ajax({
			url: `/api/posts/${ids.post_id}/likes/${ids.id}`,
			type: 'DELETE',
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

	createImageLike(like, success, error) {
    console.log("createImageLike(like, success, error) in like_api_util.js");

    $.ajax({
      url: `/api/images/${like.image_id}/likes`,
      method: "POST",
      data: { image_like: like },
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

  deleteImageLike(ids, success, error) {
    console.log("deleteImageLike(id, success, error) in like_api_util.js");

		$.ajax({
			url: `/api/images/${ids.image_id}/likes/${ids.id}`,
			type: 'DELETE',
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

	createFriendshipLike(like, success, error) {
    console.log("createFriendshipLike(like, success, error) in like_api_util.js");

    $.ajax({
      url: `/api/friendships/${like.friendship_id}/likes`,
      method: "POST",
      data: { friendship_like: like },
      success(resp) {
        console.log("successfully created friendship_like in like_api_util.js");
        console.log(resp);
        success(resp);
      },
      error(xhr) {
        console.log("failed to create friendship_like in like_api_util.js");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
	},

  deleteFriendshipLike(ids, success, error) {
    console.log("deleteFriendshipLike(id, success, error) in like_api_util.js");

		$.ajax({
			url: `/api/friendships/${ids.friendship_id}/likes/${ids.id}`,
			type: 'DELETE',
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
