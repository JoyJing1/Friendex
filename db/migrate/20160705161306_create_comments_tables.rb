class CreateCommentsTables < ActiveRecord::Migration
  def change
    create_table :post_comments do |t|
      t.integer :post_id, null: false
      t.integer :user_id, null: false
      t.string :body, null: false

      t.timestamps null: false

      t.index :post_id
      t.index :user_id
    end

    create_table :image_comments do |t|
      t.integer :image_id, null: false
      t.integer :user_id, null: false
      t.string :body, null: false

      t.timestamps null: false

      t.index :image_id
      t.index :user_id
    end

    create_table :friendship_comments do |t|
      t.integer :image_id, null: false
      t.integer :friendship_id, null: false
      t.string :body, null: false

      t.timestamps null: false

      t.index :image_id
      t.index :friendship_id
    end


  end
end
