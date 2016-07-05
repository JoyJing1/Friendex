json.extract!(
  post_comment,

  :id, :post_id, :user_id, :body,
  :created_at
)

json.author_name post_comment.user.username
json.author_img post_comment.user_profile.profile_img
