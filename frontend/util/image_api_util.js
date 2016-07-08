"use strict";

const ImageApiUtil = {
	createImage(image, success, error) {
    // console.log("createImage(image, success, error) in image_api_util.js");

    $.ajax({
      url: "/api/images",
      method: "POST",
      data: { image: image, id: image.user_id },
      success(resp) {
        // console.log("successfully created image in image_api_util.js");
        success(resp);
      },
      error(xhr) {
        // console.log("failed to create image in image_api_util.js");
        const errors = xhr.responseJSON;
        // console.log(errors);
      }
    });
	},

  deleteImage(id, success, error) {
    // console.log("deleteImage(id, success, error) in image_api_util.js");

		$.ajax({
			url: `/api/images/${id}`,
			type: 'DELETE',
			success(resp) {
        // console.log("successfully deleted image");
        // console.log(resp);
        success(resp);
      },
			error(xhr) {
        // console.log("failed to delete image");
				const errors = xhr.responseJSON;
        // console.log(errors);
			}
		});
  },

  // fetchImage(id, success, error) {
  //   console.log("fetchImage(id, success, error) in image_api_util.js");
  //
	// 	$.ajax({
	// 		url: `/api/images/${id}`,
	// 		type: 'GET',
	// 		success(resp) {
  //       console.log("successfully fetched image");
  //       console.log(resp);
  //       success(resp);
  //     },
	// 		error(xhr) {
  //       console.log("failed to fetch image");
	// 			const errors = xhr.responseJSON;
  //       console.log(errors);
	// 		}
	// 	});
  // },

  fetchManyImages(user_id, success, error) {
    console.log("fetchImages(ids, success, error) in image_api_util.js");

    $.ajax({
      url: `/api/images/`,
      type: 'GET',
      data: { user_id: user_id },
      success(resp) {
        console.log("successfully fetched images");
        console.log(resp);
        success(resp);
      },
      error(xhr) {
        console.log("failed to fetch images");
        const errors = xhr.responseJSON;
        console.log(errors);
      }
    });
  }

};

module.exports = ImageApiUtil;
