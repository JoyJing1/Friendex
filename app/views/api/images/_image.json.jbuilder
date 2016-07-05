json.extract!(
  image,
  :id, :url, :author_id, :receiver_id, :created_at, :updated_at,
)

json.profile_img image.author_profile.profile_img

json.author_name image.author.username

json.type "photo"
