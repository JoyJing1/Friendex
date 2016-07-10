class Api::ProfilesController < ApplicationController

  def show
    @profile = Profile.find(params[:id])
    # debugger;
  end

  def update
    @profile = Profile.find(params[:id])

    if @profile.update_attributes(profile_params)
      render "api/profiles/show"
    else
      render json: @profile.errors, status: 422
    end
  end

  private

  def profile_params
		params.require(:profile).permit(:first_name, :last_name, :birthday, :gender, :profile_img, :background_img, :workplace, :school, :current_city, :hometown, :relationship)
	end

end
