class Api::LikesController < ApplicationController

	def create

    if params[:post_id]
      @post_like = PostLike.new(post_like_params)

      if @post_like.save
        render "api/posts/like"
      else
        render json: @post_like.errors, status: 422
      end

    elsif params[:image_id]
      @image_like = ImageLike.new(image_like_params)

      if @image_like.save
        render "api/images/like"
      else
        render json: @image_like.errors, status: 422
      end

    elsif params[:friendship_id]
      @friendship_like = FriendshipLike.new(friendship_like_params)

      if @friendship_like.save
        render "api/friendships/like"
      else
        render json: @friendship_like.errors, status: 422
      end

    else
      render "Failed to create like. No id provided for type of like"
    end


  end

  def destroy
    if params[:post_id]
      @post_like = PostLike.find(params[:id])
      if @post_like.destroy
        render "api/posts/like"
      else
        render {}
      end

    elsif params[:image_id]
      @image_like = ImageLike.find(params[:id])
      if @image_like.destroy
        render "api/images/like"
      else
        render {}
      end

    elsif params[:friendship_id]
      @friendship_like = FriendshipLike.find(params[:id])
      if @friendship_like.destroy
        render "api/friendships/like"
      else
        render {}
      end

    else
      render "Failed to delete like. No id provided for type of like"
    end

  end

	private

	def post_like_params
		params.require(:post_like).permit(:post_id, :user_id, :body)
	end

	def image_like_params
		params.require(:image_like).permit(:image_id, :user_id, :body)
	end

	def friendship_like_params
		params.require(:friendship_like).permit(:friendship_id, :user_id, :body)
	end

end
