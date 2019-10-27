class CreateStops < ActiveRecord::Migration[5.2]
  def change
    create_table :stops do |t|
      t.string :location
      t.date :arr_date
      t.date :dep_date
      t.text :restrictions
      t.integer :trip_id

      t.timestamps
    end
  end
end
