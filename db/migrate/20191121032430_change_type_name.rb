class ChangeTypeName < ActiveRecord::Migration[5.2]
  def change
  	rename_column :accommodations, :type, :acc_type
  end
end
