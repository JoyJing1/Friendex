# class Api::PostCommentsController < ApplicationController
#
# 	def create
#     @post_comment = PostComment.new(post_comment_params)
#
#     if @post_comment.save
#       render "api/posts/comment"
#     else
#       render json: @post_comment.errors, status: 422
#     end
#   end
#
#   def destroy
#     @post_comment = PostComment.find(params[:id])
#     if @post_comment.destroy
#       render "api/posts/comment"
#     else
#       render {}
#     end
#   end
#
# 	private
#
# 	def post_comment_params
# 		params.require(:post_comment).permit(:post_id, :user_id, :body)
# 	end
#
# end
