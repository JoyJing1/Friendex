class Friendship < ActiveRecord::Base
  validates :requestor_id, :receiver_id, :status, presence: true

  belongs_to :requestor,
    foreign_key: :requestor_id,
    class_name: :User

  belongs_to :receiver,
    foreign_key: :receiver_id,
    class_name: :User

end
