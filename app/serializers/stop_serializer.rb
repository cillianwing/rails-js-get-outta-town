class StopSerializer < ActiveModel::Serializer
  attributes :id, :location, :arr_date, :dep_date, :restrictions

  belongs_to :trip
end
