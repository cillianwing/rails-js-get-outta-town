class RemoveCreatorFromTrips < ActiveRecord::Migration[5.2]
  def change
    remove_column :trips, :creator, :string
  end
end
