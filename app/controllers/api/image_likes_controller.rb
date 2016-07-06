class Api::ImageLikesController < ApplicationController

	def create
    @image_like = ImageLike.new(image_like_params)

    if @image_like.save
      render "api/images/like"
    else
      render json: @image_like.errors, status: 422
    end
  end

  def destroy
    @image_like = ImageLike.find(params[:id])

    if @image_like.destroy
      render "api/images/like"
    else
      render {}
    end
  end

	private

	def image_like_params
		params.require(:image_like).permit(:image_id, :user_id)
	end

end
