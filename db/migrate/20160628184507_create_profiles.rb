class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.date :birthday, null: false
      t.string :gender, null: false, default: :other
      t.string :profile_img
      t.string :background_img
      t.string :workplace
      t.string :school
      t.string :current_city
      t.string :hometown
      t.string :relationship

      t.timestamps null: false

      t.index :user_id, unique: true
    end
  end
end
