json.extract!(
  image,
  :id, :type, :author_id, :receiver_id, :url, :created_at, :updated_at
)

json.profile_img image.author_profile.profile_img

json.author_name image.author.username

json.comments do
  json.array!(image.comments) do |image_comment|
    json.partial! "api/images/comment", image_comment: image_comment
  end
end

json.likes do
  json.array!(image.likes)
end
