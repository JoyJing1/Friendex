json.extract!(
  post,
  
  :type,
  :id, :author_id, :author_first_name, :author_last_name, :profile_img,
  :receiver_id, :receiver_first_name, :receiver_last_name,
  :post_id, :body,
  :created_at, :updated_at
)

json.author_name "#{post.author_first_name} #{post.author_last_name}"
json.receiver_name "#{post.receiver_first_name} #{post.receiver_last_name}"
