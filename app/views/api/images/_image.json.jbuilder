json.extract!(
  image,
  :id, :url, :author_id, :receiver_id
)

json.age time_ago_in_words(image.created_at)
