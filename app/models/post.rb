class Post < ActiveRecord::Base
  validates :author_id, :receiver_id, :body, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :user,
    inverse_of: true

  belongs_to :receiver,
    foreign_key: :receiver_id,
    class_name: :user,
    inverse_of: true

end
