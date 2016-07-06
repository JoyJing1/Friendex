class Api::SearchController < ApplicationController

  def index
    query = params[:query]
    # debugger;
    @users = User.where("username LIKE '%#{query.downcase}%' OR username LIKE '%#{query.capitalize}'")

    # debugger;
    render "api/search/index"
  end

end
