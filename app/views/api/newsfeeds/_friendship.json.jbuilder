json.extract!(
  friendship,

  :type,
  :id, :friendship_id, :friend_id, :new_friend_id,
  :friend_first_name, :friend_last_name, :friend_img,
  :new_friend_first_name, :new_friend_last_name, :new_friend_img,
  :created_at, :updated_at
)

json.friend_name "#{friendship.friend_first_name} #{friendship.friend_last_name}"
json.new_friend_name "#{friendship.new_friend_first_name} #{friendship.new_friend_last_name}"

json.comments do
  json.array!(friendship.comments) do |friendship_comment|
    json.partial! "api/friendships/comment", friendship_comment: friendship_comment
  end
end

# json.likes do
#   json.array!(friendship.likes) do |friendship_like|
#     json.partial! "api/friendships/like", friendship_like: friendship_like
#   end
# end

json.likes do
  friendship.likes.each do |friendship_like|
    json.set!(
      friendship_like.user_id, {user_id: friendship_like.user_id, id: friendship_like.id, friendship_id: friendship_like.friendship_id}
      # {json.partial!("api/friendships/like", friendship_like: friendship_like)}
    )
  end
end
