class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :start, :end, :group_trip, :creator_id

  has_many :stops
  has_many :users
  has_many :flights
  has_many :activities
  has_many :accommodations
end
