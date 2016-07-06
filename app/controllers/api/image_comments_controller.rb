# class Api::ImageCommentsController < ApplicationController
#
# 	def create
#     @image_comment = ImageComment.new(image_comment_params)
#
#     if @image_comment.save
#       render "api/images/comment"
#     else
#       render json: @image_comment.errors, status: 422
#     end
#   end
#
#   def destroy
#     @image_comment = ImageComment.find(params[:id])
#
#     if @image_comment.destroy
#       render "api/images/comment"
#     else
#       render {}
#     end
#   end
#
# 	private
#
# 	def image_comment_params
# 		params.require(:image_comment).permit(:image_id, :user_id, :body)
# 	end
#
# end
