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
