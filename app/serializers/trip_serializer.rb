class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :starte, :end, :group_trip

  has_many :stops
  has_many :users
end
