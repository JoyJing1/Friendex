json.extract!(
  user,
  :id, :username
)

json.profile_img user.profile.profile_img
