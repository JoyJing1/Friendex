json.extract!(
  photo,
  :id, :type, :author_id, :receiver_id, :url, :created_at, :updated_at
)

json.profile_img photo.author_profile.profile_img

json.author_name photo.author.username
