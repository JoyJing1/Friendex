# May need to nest in if / else
# FriendshipCommentsController currently passing in @post_comment
#  not post_comment

json.partial! "api/posts/comment", post_comment: @post_comment


# json.extract!(
#   @post_comment,
#
#   :id, :post_id, :user_id, :body,
#   :created_at
# )
#
# json.author_name @post_comment.user.username
# json.author_img @post_comment.user_profile.profile_img
