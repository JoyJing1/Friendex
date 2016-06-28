class Profile < ActiveRecord::Base
	validates :first_name, :last_name, :birthday, :gender, presence: true
	validates :user_id, uniqueness: true

  belongs_to :user
end
