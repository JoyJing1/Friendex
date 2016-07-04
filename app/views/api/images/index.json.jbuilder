json.array!(@images) do |image|
  json.partial!('image', image: image)
end
