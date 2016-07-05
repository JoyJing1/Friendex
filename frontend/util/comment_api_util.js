"use strict";

const CommentApiUtil = {

	createPostComment(comment, success, error) {
    console.log("createPostComment(comment, success, error) in comment_api_util.js");

    $.ajax({
      url: `/api/posts/${comment.post_id}/comments`,
      method: "POST",
      data: { post_comment: comment },
      success(resp) {
        console.log("successfully created post_comment in comment_api_util.js");
        success(resp);
      },
      error(xhr) {
        console.log("failed to create post_comment in comment_api_util.js");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
	},

  deletePostComment(ids, success, error) {
    console.log("deletePostComment(id, success, error) in comment_api_util.js");

		$.ajax({
			url: `/api/posts/${id.post_id}/comments/${id.id}`,
			type: 'DELETE',
			success(resp) {
        console.log("successfully deleted post_comment");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to delete post_comment");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

	createImageComment(comment, success, error) {
    console.log("createImageComment(comment, success, error) in comment_api_util.js");

    $.ajax({
      url: `/api/images/${comment.image_id}/comments`,
      method: "POST",
      data: { image_comment: comment },
      success(resp) {
        console.log("successfully created image_comment in comment_api_util.js");
        console.log(resp);
        success(resp);
      },
      error(xhr) {
        console.log("failed to create image_comment in comment_api_util.js");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
	},

  deleteImageComment(ids, success, error) {
    console.log("deleteImageComment(id, success, error) in comment_api_util.js");

		$.ajax({
			url: `/api/images/${id.image_id}/comments/${id.id}`,
			type: 'DELETE',
			success(resp) {
        console.log("successfully deleted image_comment");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to delete image_comment");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

	createFriendshipComment(comment, success, error) {
    console.log("createFriendshipComment(comment, success, error) in comment_api_util.js");

    $.ajax({
      url: `/api/friendships/${comment.friendship_id}/comments`,
      method: "POST",
      data: { friendship_comment: comment },
      success(resp) {
        console.log("successfully created friendship_comment in comment_api_util.js");
        console.log(resp);
        success(resp);
      },
      error(xhr) {
        console.log("failed to create friendship_comment in comment_api_util.js");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
	},

  deleteFriendshipComment(ids, success, error) {
    console.log("deleteFriendshipComment(id, success, error) in comment_api_util.js");

		$.ajax({
			url: `/api/friendships/${id.friendship_id}/comments/${id.id}`,
			type: 'DELETE',
			success(resp) {
        console.log("successfully deleted friendship_comment");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to delete friendship_comment");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

};

module.exports = CommentApiUtil;
