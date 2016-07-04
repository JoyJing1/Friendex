class Image < ActiveRecord::Base
  validates :user_id, :url, presence: true

  belongs_to :user

end
