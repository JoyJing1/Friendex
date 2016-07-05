class Image < ActiveRecord::Base
  validates :author_id, :receiver_id, :url, presence: true
  attr_accessor :type

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id

  belongs_to :receiver,
    class_name: :User,
    foreign_key: :receiver_id

  has_one :author_profile,
    through: :author,
    source: :profile

end
