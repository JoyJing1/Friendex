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
    @user = User.find(params[:id])
    @images = @user.images
  end

	private

	def image_params
		params.require(:image).permit(:url, :user_id)
	end

end
