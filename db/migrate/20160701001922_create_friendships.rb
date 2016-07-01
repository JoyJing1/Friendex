class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :requestor_id, null: false
      t.integer :receiver_id, null: false
      t.string :status, null: false, default: :PENDING

      t.timestamps null: false
    end
  end
end
