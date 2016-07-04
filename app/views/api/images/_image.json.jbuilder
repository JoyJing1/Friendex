json.extract! image, :id, :url
json.age time_ago_in_words(image.created_at)
