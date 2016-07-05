# May need to nest in if / else
# FriendshipCommentsController currently passing in @image_comment
#  not image_comment

json.extract!(
  @image_comment,

  :id, :image_id, :user_id, :body,
  :created_at
)

json.author_name @image_comment.user.username
json.author_img @image_comment.user_profile.profile_img
