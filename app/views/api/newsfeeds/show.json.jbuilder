json.array!(@newsfeed) do |item|
  if item.type == "post"
    json.partial!('post', post: item)
  elsif item.type == "friendship"
    json.partial!('friendship', friendship: item)
  end
end
