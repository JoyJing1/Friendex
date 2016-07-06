class Api::SearchController < ApplicationController

  def index
    query = params[:query]
    @users = User.where("username LIKE '%#{query}%' OR username LIKE '%#{query.downcase}%' OR username LIKE '%#{query.capitalize!}'")

    render "api/search/index"
  end

end
