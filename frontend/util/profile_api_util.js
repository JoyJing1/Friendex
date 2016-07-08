"use strict";

const ProfileApiUtil = {
	fetchProfile(id, success, error) {
    console.log("fetchProfile(id, success, error) in profile_api_util.js");
    console.log(id);
    // debugger;
		$.ajax({
			url: `/api/profiles/${id}`,
			type: 'GET',
			success(resp) {
        // console.log("successfully pulled profile info in fetchProfile");
        // console.log(resp);
        success(resp);
      },
			error(xhr) {
        // console.log("failed to pull profile info");
				const errors = xhr.responseJSON;
			}
		});
	},

	updateProfile(profile, success, error) {
    // console.log("updateProfile(id, success, error) in profile_api_util.js");
    // console.log(profile);

		$.ajax({
			url: `/api/profiles/${profile.id}`,
			type: 'PATCH',
      data: { profile: profile },
			success(resp) {
        // console.log("successfully pulled profile info in fetchProfile");
        // console.log(resp);
        success(resp);
      },
			error(xhr) {
        // console.log("failed to pull profile info");
				const errors = xhr.responseJSON;
			}
		});

	}
};

module.exports = ProfileApiUtil;
