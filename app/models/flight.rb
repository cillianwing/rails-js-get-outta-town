class Flight < ApplicationRecord
	include FlightsHelper

  has_many :tickets
  has_many :trips, through: :tickets

  validates :confirm_num, :airline, :flight_num, :departure, :arrival, :dep_loc, :arr_loc, :checked_bags, :cost, presence: true
  validate :flight_start_before_end, :flight_trip_date_confirm, :flights_date_confirm
end
