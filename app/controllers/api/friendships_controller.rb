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
    @friendship = nil;

    if params[:id] == "undefined"
      @friendships = Friendship.where("requestor_id = ? AND receiver_id = ?", friendship_params["requestor_id"], friendship_params["receiver_id"])
                    .order(created_at: :desc)
      @friendship = @friendships[0]
    else
      @friendship = Friendship.find(params[:id])
    end

    if @friendship.update_attributes(friendship_params)
      if params[:page] == "receiver"
        @friend_request = { id: @friendship.id,
                            requestor_id: @friendship.requestor_id,
                            receiver_id: @friendship.receiver_id,
                            status: @friendship.status,
                            date_request_sent: @friendship.created_at,
                            friend_id: @friendship.requestor_id,
                            first_name: @friendship.requestor_profile.first_name,
                            last_name: @friendship.requestor_profile.last_name,
                            profile_img: @friendship.requestor_profile.profile_img }

      render "api/friendships/show_friend_request"

      else
        @friend_request = { id: @friendship.id,
                            requestor_id: @friendship.requestor_id,
                            receiver_id: @friendship.receiver_id,
                            status: @friendship.status,
                            date_request_sent: @friendship.created_at,
                            friend_id: @friendship.receiver_id,
                            first_name: @friendship.receiver_profile.first_name,
                            last_name: @friendship.receiver_profile.last_name,
                            profile_img: @friendship.receiver_profile.profile_img }

      render "api/friendships/show_friend_request"
      end

    else
      render json: @friendship.errors, status: 422
    end
  end

  def destroy
    p friendship_params

    @friendships = Friendship.where("requestor_id = ? AND receiver_id = ?", friendship_params["requestor_id"], friendship_params["receiver_id"])
    @friendship = @friendships[0]

    if @friendships.delete_all #Can change to destroy if make sure there can only be one request per pairing

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
		params.require(:friendship).permit(:id, :requestor_id, :receiver_id, :status)
	end

end
