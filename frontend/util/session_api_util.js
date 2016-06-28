"use strict";

const SessionApiUtil = {
	logIn(user, success, error) {
    console.log("logIn(user, success, error) in session_api_util.js");
    // debugger;
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
			success,
			error(xhr) {
				const errors = xhr.responseJSON;
        // debugger;
				error("login", errors);
			}
		});
	},

	logOut(success) {
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success,
			error: function () {
        // debugger;
			  console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	signUp(user, successCallback, error) {
    console.log("signUp(user, success, error) in session_api_util.js");
    debugger;
		$.ajax({
			url: '/api/user',
			type: 'POST',
			dataType: 'json',
			data: { user },
			success(resp) {
        successCallback(resp);
        // debugger;
        // Need to add in user_id
        // createProfile(resp.id);
        // console.log(resp);
        // redirectUser(resp.id);
        // hashHistory.push(`/users/${resp.id}`);
      },
			error(xhr) {
				const errors = xhr.responseJSON;
        // debugger;
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
        // debugger;
			  console.log("Error in SessionApiUtil#fetchCurrentUser");
			},
      complete: function(){
				complete();
			}
		});
	}
};

module.exports = SessionApiUtil;
