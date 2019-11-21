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

ActiveRecord::Schema.define(version: 2019_11_21_032430) do

  create_table "accommodations", force: :cascade do |t|
    t.string "booking_num"
    t.string "acc_type"
    t.string "name"
    t.string "address_1"
    t.string "address_2"
    t.datetime "check_in"
    t.datetime "check_out"
    t.decimal "cost"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "activities", force: :cascade do |t|
    t.string "res_num"
    t.string "title"
    t.text "description"
    t.string "address_1"
    t.string "address_2"
    t.string "location"
    t.datetime "start"
    t.datetime "end"
    t.text "requirements"
    t.decimal "cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookings", force: :cascade do |t|
    t.integer "trip_id"
    t.integer "accommodation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["accommodation_id"], name: "index_bookings_on_accommodation_id"
    t.index ["trip_id"], name: "index_bookings_on_trip_id"
  end

  create_table "flights", force: :cascade do |t|
    t.string "confirm_num"
    t.string "airline"
    t.string "flight_num"
    t.datetime "departure"
    t.datetime "arrival"
    t.string "dep_loc"
    t.string "arr_loc"
    t.integer "checked_bags"
    t.decimal "cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "trip_id"
    t.integer "activity_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_reservations_on_activity_id"
    t.index ["trip_id"], name: "index_reservations_on_trip_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.text "comment"
    t.integer "rating"
    t.integer "user_id"
    t.integer "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stops", force: :cascade do |t|
    t.string "location"
    t.date "arr_date"
    t.date "dep_date"
    t.text "restrictions"
    t.integer "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tickets", force: :cascade do |t|
    t.integer "trip_id"
    t.integer "flight_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["flight_id"], name: "index_tickets_on_flight_id"
    t.index ["trip_id"], name: "index_tickets_on_trip_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.date "start"
    t.date "end"
    t.boolean "group_trip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "creator_id"
  end

  create_table "trips_users", id: false, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "trip_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "name"
    t.text "bio"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
