"use strict";

const UserApiUtil = {
	fetchUser(id, success, error) {
    console.log("fetchUser(id, success, error) in user_api_util.js");
		$.ajax({
			url: `/api/users/${id}`,
			type: 'GET',
			success(resp) {
        console.log("successfully fetched users/show");
        console.log(resp);
        success();
      },
			error(xhr) {
				const errors = xhr.responseJSON;
				error("login", errors);
			}
		});
	}
};

module.exports = UserApiUtil;
