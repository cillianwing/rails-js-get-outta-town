class Trip < ApplicationRecord
  include TripsHelper

  scope :past_trips, -> { where("end < ?", Date.today) }
  scope :upcoming_trips, -> { where("start > ?", Date.today) }
  scope :group_trips, -> { where(group_trip: true) }

  has_and_belongs_to_many :users
  has_many :stops
  has_many :reviews

  has_many :tickets
  has_many :flights, through: :tickets

  has_many :reservations
  has_many :activities, through: :reservations

  has_many :bookings
  has_many :accommodations, through: :bookings

  validates :title, :description, :start, :end, presence: { message: "%{attribute} cannot be blank." }
  validate :start_before_end, :date_confirm

  def travellers
    self.users.collect do |user|
      user.name
    end
  end

  def stop_locations
    self.stops.collect do |stop|
      stop.location
    end
  end

  def flight_costs
    total = 0
    self.flights.each { |flight| total += flight[:cost] }
    total
  end

  def activity_costs
    total = 0
    self.activities.each { |activity| total += activity[:cost] }
    total
  end

  def accommodation_costs
    total = 0
    self.accommodations.each { |accommodation| total += accommodation[:cost] }
    total
  end

  def total_costs
    total = self.flight_costs + self.activity_costs + self.accommodation_costs
    total
  end

  def select_image
    month = self.start.to_s.split("-")[1].to_i
    if month == 1
      image_url = "january.jpg"
    elsif month == 2
      image_url = "february.jpg"
    elsif month == 3
      image_url = "march.jpg"
    elsif month == 4
      image_url = "april.jpg"
    elsif month == 5
      image_url = "may.jpg"
    elsif month == 6
      image_url = "june.jpg"
    elsif month == 7
      image_url = "july.jpg"
    elsif month == 8
      image_url = "august.jpg"
    elsif month == 9
      image_url = "september.jpg"
    elsif month == 10
      image_url = "october.jpg"
    elsif month == 11
      image_url = "november.jpg"
    elsif month == 12
      image_url = "december.jpg"
    end
  end
end
