json.array!(@posts) do |item|

  if item.type == "post"
    json.partial!('post', post: item)
    
  elsif item.type == "image"
    json.partial!('image', image: item)
  end
end
