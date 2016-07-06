# class Api::PostLikesController < ApplicationController
#
# 	def create
#     @post_like = PostLike.new(post_like_params)
#
#     if @post_like.save
#       render "api/posts/like"
#     else
#       render json: @post_like.errors, status: 422
#     end
#   end
#
#   def destroy
#     @post_like = PostLike.find(params[:id])
#     if @post_like.destroy
#       render "api/posts/like"
#     else
#       render {}
#     end
#   end
#
# 	private
#
# 	def post_like_params
# 		params.require(:post_like).permit(:post_id, :user_id)
# 	end
#
# end
