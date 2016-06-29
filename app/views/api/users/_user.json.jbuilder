json.extract!(
  user,
  :id, :email
)

json.profile json.extract! user.profile
