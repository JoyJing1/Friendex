json.extract!(
  post,
  :id, :author_id, :receiver_id, :body, :created_at
)

json.profile_img post.author_profile.profile_img

json.author_name post.author.username
