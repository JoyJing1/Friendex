class Api::ProfilesController < ApplicationController

	def create
		@profile = Profile.new(profile_params)

		if @profile.save
			render "api/profiles/show"
		else
			render json: @profile.errors, status: 422
		end
	end

  def destroy
    @profile = Profile.find(params[:id])
    @profile.destroy
    render :show
  end

  def update
    @profile = Profile.find(params[:id])

    if @profile.update_attributes(profile_params)
      render "api/profiles/show"
    else
      render json: @profile.errors, status: 422
    end
  end

  def show
    @profile = Profile.find(params[:id])
  end

	private

	def profile_params
		params.require(:profile).permit(:user_id, :first_name, :last_name, :birthday, :gender, :profile_img, :background_img, :workplace, :school, :current_city, :hometown, :relationship)
	end

end
