class Profile < ActiveRecord::Base
	validates :first_name, :last_name, :birthday, :gender, :profile_img, presence: true
	validates :user, presence: true, uniqueness: true

  belongs_to :user, inverse_of: :profile
end
