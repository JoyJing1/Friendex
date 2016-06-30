"use strict";

const PostApiUtil = {
	createPost(post, success, error) {
    console.log("createPost(post, success, error) in post_api_util.js");
		$.ajax({
			url: `/api/posts`,
			type: 'POST',
      data: { post: post },
			success(resp) {
        console.log("successfully created new post");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to create a new post");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
	},

  updatePost(post, success, error) {
    console.log("updatePost(post, success, error) in post_api_util.js");
		$.ajax({
			url: `/api/posts/${post.id}`,
			type: 'PATCH',
      data: { post: post },
			success(resp) {
        console.log("successfully edited post");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to create a new post");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
	},

  deletePost(id, success, error) {
    console.log("deletePost(id, success, error) in post_api_util.js");
		$.ajax({
			url: `/api/posts/${id}`,
			type: 'DELETE',
			success(resp) {
        console.log("successfully deleted post");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to delete post");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  },

  fetchPost(id, success, error) {
    console.log("fetchPost(id, success, error) in post_api_util.js");
		$.ajax({
			url: `/api/posts/${id}`,
			type: 'GET',
			success(resp) {
        console.log("successfully fetched post");
        console.log(resp);
        success(resp);
      },
			error(xhr) {
        console.log("failed to fetch post");
				const errors = xhr.responseJSON;
        console.log(errors);
			}
		});
  }

};

module.exports = PostApiUtil;
