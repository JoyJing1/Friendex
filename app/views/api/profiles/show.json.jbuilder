json.partial! "api/profiles/profile", profile: @profile

json.user do
  json.partial! "api/users/user", user: @profile.user
end

json.username @profile.user.username
json.email @profile.user.email
