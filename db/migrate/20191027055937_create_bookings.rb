class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.belongs_to :trip, foreign_key: true
      t.belongs_to :accommodation, foreign_key: true

      t.timestamps
    end
  end
end
