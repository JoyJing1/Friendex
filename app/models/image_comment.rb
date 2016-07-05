class ImageComment < ActiveRecord::Base
  validates :image_id, :user_id, :body, presence: true

  belongs_to :image
  belongs_to :user

  has_one :user_profile,
    through: :user,
    source: :profile

end
