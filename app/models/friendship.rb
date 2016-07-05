class Friendship < ActiveRecord::Base
  validates :requestor_id, :receiver_id, :status, presence: true

  belongs_to :requestor,
    foreign_key: :requestor_id,
    class_name: :User

  belongs_to :receiver,
    foreign_key: :receiver_id,
    class_name: :User

  has_one :requestor_profile,
    through: :requestor,
    source: :profile

  has_one :receiver_profile,
    through: :receiver,
    source: :profile

  has_many :comments,
    class_name: :FriendshipComment,
    foreign_key: :friendship_id,
    primary_key: :id

end
