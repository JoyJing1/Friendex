class Api::FriendshipsController < ApplicationController

	def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save

      @friend = Profile.find(@friendship.requestor_id)
      @friend_request = { id: @friendship.id,
        status: @friendship.status,
        date_request_sent: @friendship.created_at,
        requestor_id: @friendship.requestor_id,
        receiver_id: @friendship.receiver_id,
        friend_id: @friendship.requestor_id,
        first_name: @friend.first_name,
        last_name: @friend.last_name,
        profile_img: @friend.profile_img }

      render "api/friendships/show_friend_request"

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

  def destroy
    @friendship = Friendship.where("requestor_id = ? AND receiver_id = ?", friendship_params.requestor_id, friendship_params.receiver_id)


    if @friendship.delete_all #Can change to destroy if make sure there can only be one request per pairing
      render "api/friendships/show"
    else
      render {}
    end
  end

  def show
    @friendship = Friendship.find(params[:id])
  end

  def index
    @user = User.find(params[:id])
    @friends = @user.friends
    @friend_requests_received = @user.friend_requests_received
    @friend_requests_sent = @user.friend_requests_sent
  end

	private

	def friendship_params
		params.require(:friendship).permit(:requestor_id, :receiver_id, :status)
	end

end
