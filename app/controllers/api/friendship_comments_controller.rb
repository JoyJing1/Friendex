# class Api::FriendshipCommentsController < ApplicationController
#
# 	def create
#     @friendship_comment = FriendshipComment.new(friendship_comment_params)
#
#     if @friendship_comment.save
#       render "api/friendships/comment"
#     else
#       render json: @friendship_comment.errors, status: 422
#     end
#   end
#
#   def destroy
#     @friendship_comment = FriendshipComment.find(params[:id])
#     if @friendship_comment.destroy
#       render "api/friendships/comment"
#     else
#       render {}
#     end
#   end
#
# 	private
#
# 	def friendship_comment_params
# 		params.require(:friendship_comment).permit(:friendship_id, :user_id, :body)
# 	end
#
# end
