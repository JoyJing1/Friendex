class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?;

  private

  def current_user
  	@current_user ||= User.find_by(session_token: session[:session_token])
  end

  # def current_username
  #   profile = Profile.find_by(user_id, @current_user.id)
  #   # "#{profile.first_name} #{profile.last_name}"
  # end

  def logged_in?
    !!current_user
  end

  def login(user)
    # debugger;
  	session[:session_token] = user.reset_session_token!
  end

  def logout!
    session[:session_token] = nil
    current_user.reset_session_token!
    @current_user = nil
  end

  def require_loggedin
    render json: {base: ['invalid credentials']}, status: 401 if !current_user
  end

end
