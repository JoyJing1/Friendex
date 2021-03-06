"use strict";

const SessionApiUtil = {
	logIn(user, success, error) {
    // console.log("logIn(user, success, error) in session_api_util.js");

		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
			success,
			error(xhr) {
				const errors = xhr.responseJSON;
				error("login", errors);
			}
		});
	},

	logOut(success) {
		$.ajax({
			url: '/api/session',
			method: 'DELETE',
			success,
			error: function () {
			  // console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	signUp(formData, successCallback, error) {
    // console.log("signUp(user, success, error) in session_api_util.js");

		$.ajax({
			url: '/api/user',
			type: 'POST',
			dataType: 'json',
			data: formData,
			success(resp) {
        successCallback(resp);
      },
			error(xhr) {
				const errors = xhr.responseJSON;
				error("signup", errors);
			}
		});
	},

	fetchCurrentUser(success, complete) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success,
			error: function (xhr) {
			  // console.log("Error in SessionApiUtil#fetchCurrentUser");
			},
      complete: function(){
				complete();
			}
		});
	}
};

module.exports = SessionApiUtil;
