# class Api::FriendshipLikesController < ApplicationController
#
# 	def create
#     @friendship_like = FriendshipLike.new(friendship_like_params)
#
#     if @friendship_like.save
#       render "api/friendships/like"
#     else
#       render json: @friendship_like.errors, status: 422
#     end
#   end
#
#   def destroy
#     @friendship_like = FriendshipLike.find(params[:id])
#     if @friendship_like.destroy
#       render "api/friendships/like"
#     else
#       render {}
#     end
#   end
#
# 	private
#
# 	def friendship_like_params
# 		params.require(:friendship_like).permit(:friendship_id, :user_id)
# 	end
#
# end
