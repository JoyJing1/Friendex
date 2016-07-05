class Api::ImagesController < ApplicationController

	def create
    @image = Image.new(image_params)
    if @image.save
      render :show
    else
      render json: @image.errors, status: 422
    end
  end

  def index
    cloud_name = ENV['CLOUD_NAME']
    upload_preset = Figaro.env.UPLOAD_PRESET

    @user = User.find(params[:user_id])
    @images = @user.images_received.order(created_at: :desc)
  end

	private

	def image_params
		params.require(:image).permit(:url, :author_id, :receiver_id)
	end

end
