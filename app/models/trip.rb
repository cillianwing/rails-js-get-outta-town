class Trip < ApplicationRecord
  scope :past_trips, -> { where("end_date < ?", Date.today) }
  scope :upcoming_trips, -> { where("start_date > ?", Date.today) }
  scope :group_trips, -> { where(group_trip: true) }

  has_and_belongs_to_many :users
  has_many :stops
  has_many :reviews

  has_many :tickets
  has_many :transportations, through: :tickets

  has_many :reservations
  has_many :activities, through: :reservations

  has_many :bookings
  has_many :accommodations, through: :bookings
end
