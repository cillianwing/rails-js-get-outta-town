class CreateFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :flights do |t|
      t.string :confirm_num
      t.string :airline
      t.string :flight_num
      t.datetime :departure
      t.datetime :arrival
      t.string :dep_loc
      t.string :arr_loc
      t.integer :checked_bags
      t.decimal :cost

      t.timestamps
    end
  end
end
