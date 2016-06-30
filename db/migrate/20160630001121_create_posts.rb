class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false
      t.integer :receiver_id, null: false
      t.string :body, null: false

      t.timestamps null: false

      t.index :author_id
      t.index :receiver_id
    end
  end
end
