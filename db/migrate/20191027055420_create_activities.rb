class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.string :res_num
      t.string :title
      t.text :description
      t.string :address_1
      t.string :address_2
      t.string :location
      t.datetime :start
      t.datetime :end
      t.text :requirements
      t.decimal :cost

      t.timestamps
    end
  end
end
