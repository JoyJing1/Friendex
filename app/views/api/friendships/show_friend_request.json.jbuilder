json.extract! @friend_request, :requestor_id, :receiver_id

json.partial! "api/friendships/friend_request", friend_request: @friend_request
