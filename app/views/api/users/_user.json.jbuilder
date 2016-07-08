json.extract!(
  user,
  :id, :email, :username
)

json.profile_id user.profile.id
