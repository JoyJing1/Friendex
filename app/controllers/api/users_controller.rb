class Api::UsersController < ApplicationController

	def create
    @user = User.new(user_params)

    if @user.save
      profile_params_full = profile_params
      profile_params_full["user_id"] = @user.id
      @profile = Profile.new(profile_params_full)

      if @profile.save
        login(@user)
        render "api/users/show"
      else
        render json: @profile.errors, status: 422
      end
    else
      render json: @user.errors, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

	private

	def user_params
		params.require(:user).permit(:email, :password, :username)
	end

  def profile_params
		params.require(:profile).permit(:first_name, :last_name, :birthday, :gender, :profile_img, :background_img, :workplace, :school, :current_city, :hometown, :relationship)
	end

end
