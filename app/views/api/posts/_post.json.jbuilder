json.extract!(
  post,
  :id, :type, :author_id, :receiver_id, :body, :created_at, :updated_at
)

json.profile_img post.author_profile.profile_img

json.author_name post.author.username
