class FriendshipComment < ActiveRecord::Base
  validates :friendship_id, :user_id, :body, presence: true

  belongs_to :friendship
  belongs_to :user

  has_one :user_profile,
    through: :user,
    source: :profile

end
