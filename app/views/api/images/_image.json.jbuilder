json.extract!(
  image,
  :id, :url, :author_id, :receiver_id, :created_at, :updated_at,
)

json.profile_img image.author_profile.profile_img

json.author_name image.author.username

json.type "image"

json.comments do
  json.array!(image.comments) do |image_comment|
    json.partial! "api/images/comment", image_comment: image_comment
  end
end

json.likes do
  json.array!(image.likes) do |image_like|
    json.partial! "api/images/like", image_like: image_like
  end
end
