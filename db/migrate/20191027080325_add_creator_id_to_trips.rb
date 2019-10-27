class AddCreatorIdToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :creator_id, :integer
  end
end
