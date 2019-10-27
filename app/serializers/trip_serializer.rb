class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :start, :end, :group_trip, :creator

  has_many :stops
  has_many :users
end
