json.extract!(
  friendship_comment,

  :id, :friendship_id, :user_id, :body,
  :created_at
)

# Need tao add user.username and user.profile.profile_img
json.author_name
