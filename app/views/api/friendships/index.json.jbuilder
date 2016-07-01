json.friends do
  json.array!(@friends) do |friend|
    json.partial!('friend', friend: friend)
  end
end

json.friend_requests_received do
  json.array!(@friend_requests_received) do |friend_request|
    json.partial!('friend_request', friend_request: friend_request)
  end
end

json.friend_requests_sent do
  json.array!(@friend_requests_sent) do |friend_request|
    json.partial!('friend_request', friend_request: friend_request)
  end
end
