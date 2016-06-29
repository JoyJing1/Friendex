class AddDisplayNameToUsersTable < ActiveRecord::Migration
  def change
    remove_column :profiles, :display_name, :string
    add_column :users, :username, :string
  end
end
