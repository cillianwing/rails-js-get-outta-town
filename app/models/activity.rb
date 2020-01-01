class Activity < ApplicationRecord
	include ActivitiesHelper

  has_many :reservations
  has_many :trips, through: :reservations

  validates :title, :address_1, :location, :start, :end, :cost, presence: true
  validate :activity_start_before_end, :activity_trip_date_confirm, :activities_date_confirm
end
