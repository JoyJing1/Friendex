json.extract!(
  image_like,

  :id, :image_id, :user_id,
  :created_at
)

json.liker_name image_like.user.username
