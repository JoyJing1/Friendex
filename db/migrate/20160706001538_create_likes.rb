class CreateLikes < ActiveRecord::Migration
  def change
    create_table :post_likes do |t|
      t.integer :post_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false

      t.index :post_id
      t.index :user_id
    end

    create_table :image_likes do |t|
      t.integer :image_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false

      t.index :image_id
      t.index :user_id
    end

    create_table :friendship_likes do |t|
      t.integer :friendship_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false

      t.index :friendship_id
      t.index :user_id
    end

  end
end
