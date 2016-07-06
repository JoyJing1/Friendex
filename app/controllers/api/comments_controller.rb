class Api::CommentsController < ApplicationController

	def create

    if params[:post_id]
      @post_comment = PostComment.new(post_comment_params)

      if @post_comment.save
        render "api/posts/comment"
      else
        render json: @post_comment.errors, status: 422
      end

    elsif params[:image_id]
      @image_comment = ImageComment.new(image_comment_params)

      if @image_comment.save
        render "api/images/comment"
      else
        render json: @image_comment.errors, status: 422
      end

    elsif params[:friendship_id]
      @friendship_comment = FriendshipComment.new(friendship_comment_params)

      if @friendship_comment.save
        render "api/friendships/comment"
      else
        render json: @friendship_comment.errors, status: 422
      end

    else
      render "Failed to create comment. No id provided for type of comment"
    end


  end

  def destroy
    if params[:post_id]
      @post_comment = PostComment.find(params[:id])
      if @post_comment.destroy
        render "api/posts/comment"
      else
        render {}
      end

    elsif params[:image_id]
      @image_comment = ImageComment.find(params[:id])
      if @image_comment.destroy
        render "api/images/comment"
      else
        render {}
      end

    elsif params[:friendship_id]
      @friendship_comment = FriendshipComment.find(params[:id])
      if @friendship_comment.destroy
        render "api/friendships/comment"
      else
        render {}
      end

    else
      render "Failed to delete comment. No id provided for type of comment"
    end

  end

	private

	def post_comment_params
		params.require(:post_comment).permit(:post_id, :user_id, :body)
	end

	def image_comment_params
		params.require(:image_comment).permit(:image_id, :user_id, :body)
	end

	def friendship_comment_params
		params.require(:friendship_comment).permit(:friendship_id, :user_id, :body)
	end

end
