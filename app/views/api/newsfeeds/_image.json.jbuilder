json.extract!(
  image,

  :type,
  :id, :author_id, :author_first_name, :author_last_name, :profile_img,
  :receiver_id, :receiver_first_name, :receiver_last_name,
  :image_id, :url,
  :created_at, :updated_at
)

json.author_name "#{image.author_first_name} #{image.author_last_name}"
json.receiver_name "#{image.receiver_first_name} #{image.receiver_last_name}"

json.comments do
  json.array!(image.comments) do |image_comment|
    json.partial! "api/images/comment", image_comment: image_comment
  end
end
