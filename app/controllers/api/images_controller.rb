class Api::ImagesController < ApplicationController

	def create
    @image = Image.new(image_params)
    if @image.save
      render :show
    else

    end
  end

  def index
    cloud_name = ENV['CLOUD_NAME']
    upload_preset = Figaro.env.UPLOAD_PRESET
    # @images = Image.all # need to filter for just user
    # render :index
    @user = User.find(params[:id])
    @images - @user.images
  end

	private

	def user_params
		params.require(:image).permit(:url)
	end

end
