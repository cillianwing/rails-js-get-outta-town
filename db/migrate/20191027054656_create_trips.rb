class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :title
      t.text :description
      t.date :start
      t.date :end
      t.boolean :group_trip
      t.string :creator

      t.timestamps
    end
  end
end
