# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160706001538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendship_comments", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.integer  "friendship_id", null: false
    t.string   "body",          null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "friendship_comments", ["friendship_id"], name: "index_friendship_comments_on_friendship_id", using: :btree
  add_index "friendship_comments", ["user_id"], name: "index_friendship_comments_on_user_id", using: :btree

  create_table "friendship_likes", force: :cascade do |t|
    t.integer  "friendship_id", null: false
    t.integer  "user_id",       null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "friendship_likes", ["friendship_id"], name: "index_friendship_likes_on_friendship_id", using: :btree
  add_index "friendship_likes", ["user_id"], name: "index_friendship_likes_on_user_id", using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "requestor_id",                     null: false
    t.integer  "receiver_id",                      null: false
    t.string   "status",       default: "pending", null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  create_table "image_comments", force: :cascade do |t|
    t.integer  "image_id",   null: false
    t.integer  "user_id",    null: false
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "image_comments", ["image_id"], name: "index_image_comments_on_image_id", using: :btree
  add_index "image_comments", ["user_id"], name: "index_image_comments_on_user_id", using: :btree

  create_table "image_likes", force: :cascade do |t|
    t.integer  "image_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "image_likes", ["image_id"], name: "index_image_likes_on_image_id", using: :btree
  add_index "image_likes", ["user_id"], name: "index_image_likes_on_user_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "author_id",   null: false
    t.integer  "receiver_id", null: false
    t.string   "url",         null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "images", ["author_id"], name: "index_images_on_author_id", using: :btree
  add_index "images", ["receiver_id"], name: "index_images_on_receiver_id", using: :btree
  add_index "images", ["url"], name: "index_images_on_url", using: :btree

  create_table "post_comments", force: :cascade do |t|
    t.integer  "post_id",    null: false
    t.integer  "user_id",    null: false
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "post_comments", ["post_id"], name: "index_post_comments_on_post_id", using: :btree
  add_index "post_comments", ["user_id"], name: "index_post_comments_on_user_id", using: :btree

  create_table "post_likes", force: :cascade do |t|
    t.integer  "post_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "post_likes", ["post_id"], name: "index_post_likes_on_post_id", using: :btree
  add_index "post_likes", ["user_id"], name: "index_post_likes_on_user_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.integer  "author_id",   null: false
    t.integer  "receiver_id", null: false
    t.string   "body",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree
  add_index "posts", ["receiver_id"], name: "index_posts_on_receiver_id", using: :btree

  create_table "profiles", force: :cascade do |t|
    t.integer  "user_id",                          null: false
    t.string   "first_name",                       null: false
    t.string   "last_name",                        null: false
    t.date     "birthday",                         null: false
    t.string   "gender",         default: "other", null: false
    t.string   "profile_img"
    t.string   "background_img"
    t.string   "workplace"
    t.string   "school"
    t.string   "current_city"
    t.string   "hometown"
    t.string   "relationship"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
