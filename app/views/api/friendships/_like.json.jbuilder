json.extract!(
  friendship_like,

  :id, :friendship_id, :user_id,
  :created_at
)

json.liker_name friendship_like.user.username
