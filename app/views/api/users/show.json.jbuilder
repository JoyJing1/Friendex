json.partial! "api/users/user", user: @user

json.profile_id @user.profile.id

json.profile do
  json.partial! "api/profiles/profile", profile: @user.profile
end
