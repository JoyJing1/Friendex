class Api::ProfilesController < ApplicationController

  def show
    @profile = Profile.find(params[:id])
  end

	# private
  #
  # def profile_params
	# 	params.require(:profile).permit(:first_name, :last_name, :birthday, :gender, :profile_img, :background_img, :workplace, :school, :current_city, :hometown, :relationship)
	# end

end
