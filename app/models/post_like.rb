class PostLike < ActiveRecord::Base
  validates :post_id, :user_id, presence: true

  belongs_to :post
  belongs_to :user

  has_one :user_profile,
    through: :user,
    source: :profile

end
