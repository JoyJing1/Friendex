class EditColumnNames < ActiveRecord::Migration
  def change
    rename_column :friendship_comments, :image_id, :user_id
  end
end
