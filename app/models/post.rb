class Post < ActiveRecord::Base
  validates :author_id, :receiver_id, :body, presence: true
  attr_accessor :type

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :receiver,
    foreign_key: :receiver_id,
    class_name: :User

  has_one :author_profile,
    through: :author,
    source: :profile

  has_many :comments,
    class_name: :PostComment,
    foreign_key: :post_id,
    primary_key: :id

end
