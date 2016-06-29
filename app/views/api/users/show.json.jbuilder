json.partial! "api/users/user", user: @user

json.profile do
  json.partial! "api/profiles/profile", profile: @user.profile
end
