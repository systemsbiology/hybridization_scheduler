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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110707192339) do

  create_table "admin_users", :force => true do |t|
    t.string   "login"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hybridization_resources", :force => true do |t|
    t.string   "name"
    t.integer  "number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "requirements", :force => true do |t|
    t.integer  "sample_type_id"
    t.integer  "resource_state_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "reservations", :force => true do |t|
    t.datetime "date"
    t.string   "user_login"
    t.integer  "sample_type_id"
    t.integer  "sample_number"
    t.integer  "chip_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.boolean  "blocking",       :default => false
  end

  create_table "resource_states", :force => true do |t|
    t.string   "name"
    t.integer  "sample_limit"
    t.integer  "chip_limit"
    t.integer  "hybridization_resource_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sample_types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

end
