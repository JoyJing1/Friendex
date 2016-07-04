json.extract!(
  image,
  :id, :url, :user_id
)

json.age time_ago_in_words(image.created_at)
