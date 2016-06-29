class AddDisplayName < ActiveRecord::Migration
  def change
    add_column :profiles, :display_name, :string
  end
end
