class Accommodation < ApplicationRecord
	include AccommodationsHelper

  has_many :bookings
  has_many :trips, through: :bookings

  validates :acc_type, :name, :address_1, :check_in, :check_out, :cost, :location, presence: true
  validate :accommodation_start_before_end, :accommodation_trip_date_confirm, :accommodations_date_confirm
end
