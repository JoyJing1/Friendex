class Api::FriendshipsController < ApplicationController

	def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      render "api/friendships/show"
    else
      render json: @friendship.errors, status: 422
    end
  end

  def update
    @friendship = Friendship.find(params[:id])

    if @friendship.update_attributes(friendship_params)
      render "api/friendships/show"
    else
      render json: @friendship.errors, status: 422
    end
  end

  # def destroy
  #   @friendship = Friendship.find(params[:id])
  #   if @friendship.destroy
  #     render "api/friendships/show"
  #   else
  #     render {}
  #   end
  # end

  def show
    @friendship = Friendship.find(params[:id])
  end

  def index
    @friendships = Friendship.where("receiver_id = ? OR requestor_id = ?", params[:id], params[:id])
                  .order(updated_at: :desc)
  end


	private

	def friendship_params
		params.require(:friendship).permit(:requestor_id, :receiver_id, :status)
	end

end
