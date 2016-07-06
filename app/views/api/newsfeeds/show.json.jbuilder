json.array!(@newsfeed) do |item|

  if item.type == "post"
    json.partial!('post', post: item)

  elsif item.type == "image"
    json.partial!('image', image: item)

  elsif item.type == "friendship"
    # debugger;
    json.partial!('friendship', friendship: item)
  end
end
