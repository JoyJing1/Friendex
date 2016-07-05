json.array!(@posts) do |item|
  if item.type == "text"
    json.partial!('post', post: item)
  elsif item.type == "photo"
    json.partial!('photo', photo: item)
  end
end
