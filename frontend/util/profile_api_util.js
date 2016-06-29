const ProfileApiUtil = {
  createProfile(profile, errorCb) {
    console.log("createProfile(formData) in profile_api_util.js");
    $.ajax({
      url: '/api/profiles',
      type: 'POST',
      data: { profile },
      success() {
        console.log("created new profile successfully");
      },
      error(xhr) {
        const errors = xhr.responseJSON;
        errorCb("profile creation", errors);
      }
    });
  }
};

module.exports = ProfileApiUtil;
