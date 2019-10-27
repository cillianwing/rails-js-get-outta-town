class CreateAccommodations < ActiveRecord::Migration[5.2]
  def change
    create_table :accommodations do |t|
      t.string :booking_num
      t.string :type
      t.string :name
      t.string :address_1
      t.string :address_2
      t.datetime :check_in
      t.datetime :check_out
      t.decimal :cost
      t.string :location

      t.timestamps
    end
  end
end
