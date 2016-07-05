json.extract!(
  image,
  :id, :type, :author_id, :receiver_id, :url, :created_at, :updated_at
)

json.profile_img image.author_profile.profile_img

json.author_name image.author.username
