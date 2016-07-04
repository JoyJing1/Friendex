class CreateImagesTable < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :user_id, null: false
      t.string :url, null: false

      t.timestamps null: false

      t.index :url
      t.index :user_id
    end
  end
end
