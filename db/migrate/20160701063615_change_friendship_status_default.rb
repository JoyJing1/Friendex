class ChangeFriendshipStatusDefault < ActiveRecord::Migration
  def change
    change_column_default(:friendships, :status, "pending")
  end
end
