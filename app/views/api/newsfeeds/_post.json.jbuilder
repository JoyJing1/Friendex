json.extract!(
  post,

  :type,
  :id, :author_id, :author_first_name, :author_last_name, :profile_img,
  :receiver_id, :receiver_first_name, :receiver_last_name,
  :post_id, :body,
  :created_at, :updated_at
)

json.author_name "#{post.author_first_name} #{post.author_last_name}"
json.receiver_name "#{post.receiver_first_name} #{post.receiver_last_name}"

json.comments do
  json.array!(post.comments) do |post_comment|
    json.partial! "api/posts/comment", post_comment: post_comment
  end
end

# json.likes do
#   json.array!(post.likes) do |post_like|
#     json.partial! "api/posts/like", post_like: post_like
#   end
# end


json.likes do
  post.likes.each do |post_like|
    json.set!(
      post_like.user_id, {user_id: post_like.user_id, id: post_like.id, post_id: post_like.post_id}
      # {json.partial!("api/posts/like", post_like: post_like)}
    )
  end
end
