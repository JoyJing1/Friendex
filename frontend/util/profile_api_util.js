"use strict";

const ProfileApiUtil = {
	fetchProfile(id, success, error) {
		$.ajax({
			url: `/api/profiles/${id}`,
			type: 'GET',
			success(resp) {
        success(resp);
      },
			error(xhr) {
				const errors = xhr.responseJSON;
			}
		});
	},

	updateProfile(profile, success, error) {
		$.ajax({
			url: `/api/profiles/${profile.id}`,
			type: 'PATCH',
      data: { profile: profile },
			success(resp) {
        success(resp);
      },
			error(xhr) {
				const errors = xhr.responseJSON;
			}
		});
	}
};

module.exports = ProfileApiUtil;
