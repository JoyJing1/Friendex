json.extract!(
  post,
  :id, :type, :author_id, :receiver_id, :body, :created_at, :updated_at
)

json.profile_img post.author_profile.profile_img

json.author_name post.author.username

json.comments do
  json.array!(post.comments) do |post_comment|
    json.partial! "api/posts/comment", post_comment: post_comment
  end
end

json.likes do
  json.array!(post.likes)
end
