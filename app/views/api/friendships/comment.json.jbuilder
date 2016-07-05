# May need to nest in if / else
# FriendshipCommentsController currently passing in @friendship_comment
#  not friendship_comment

json.partial! "api/friendships/comment", friendship_comment: @friendship_comment

#
# json.extract!(
#   @friendship_comment,
#
#   :id, :friendship_id, :user_id, :body,
#   :created_at
# )
#
# json.author_name @friendship_comment.user.username
# json.author_img @friendship_comment.user_profile.profile_img
