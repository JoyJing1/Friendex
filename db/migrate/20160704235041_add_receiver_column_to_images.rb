class AddReceiverColumnToImages < ActiveRecord::Migration
  def change
    drop_table :images

    create_table :images do |t|
      t.integer :author_id, null: false
      t.integer :receiver_id, null: false
      t.string :url, null: false

      t.timestamps null: false

      t.index :url
      t.index :author_id
      t.index :receiver_id
    end
    
  end
end
