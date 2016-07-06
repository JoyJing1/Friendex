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

# json.likes do
#   json.array!(image.likes) do |image_like|
#     json.partial! "api/images/like", image_like: image_like
#   end
# end

# This code does not save anything to likes when there are none
# This was the most working version of code
json.likes do
  image.likes.each do |image_like|
    json.set!(
      image_like.user_id, {user_id: image_like.user_id, id: image_like.id, image_id: image_like.image_id}
    )
  end
end

# json.likes do
#   image.likes.each do |image_like|
#     json.set(
#       image_like.user_id, {user_id: image_like.user_id, id: image_like.id, image_id: image_like.image_id}
#     )
#   end
# end

# json.partial! "api/images/like", collection: image.likes, as :image_like

# json.likes do
#   # debugger;
#   Hash[image.likes.map{ |image_likes| [:id, :user_id, :image_id] }]
# end


# json.likes Hash[image.likes.map{ |image_like| [ image_like.id, image_like.user_id, image_like.image_id ] }]
