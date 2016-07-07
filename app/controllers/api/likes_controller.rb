class Api::LikesController < ApplicationController

	def create

    if params[:post_id]
      @post_like = PostLike.new(
        user_id: current_user.id,
        post_id: params[:post_id]
      )

      if @post_like.save
        # May be able to change to just render {user_id: @post_like.user_id}
        render "api/posts/like"
      else
        render json: @post_like.errors, status: 422
      end

    elsif params[:image_id]
      @image_like = ImageLike.new(
        user_id: current_user.id,
        image_id: params[:image_id]
      )

      if @image_like.save
        render "api/images/like"
      else
        render json: @image_like.errors, status: 422
      end

    elsif params[:friendship_id]
      @friendship_like = FriendshipLike.new(
        user_id: current_user.id,
        friendship_id: params[:friendship_id]
      )

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
      @post_like = PostLike.find_by(
        user_id: current_user.id,
        post_id: params[:post_id]
      )

      if @post_like.destroy
        render "api/posts/like"
      else
        render {}
      end

    elsif params[:image_id]
      @image_like = ImageLike.find_by(
        user_id: current_user.id,
        image_id: params[:image_id]
        )

      if @image_like.destroy
        render "api/images/like"
      else
        render {}
      end

    elsif params[:friendship_id]
      @friendship_like = FriendshipLike.find_by(
        user_id: current_user.id,
        friendship_id: params[:friendship_id]
        )

      if @friendship_like.destroy
        render "api/friendships/like"
      else
        render {}
      end

    else
      render "Failed to delete like. No id provided for type of like"
    end

  end

end
