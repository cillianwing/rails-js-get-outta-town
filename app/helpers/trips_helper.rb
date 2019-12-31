module TripsHelper

  def start_before_end
    if self.start > self.end
      errors.add(:start, "cannot be after end date")
    end
  end

  def date_confirm
    @user = User.find_by(id: self.creator_id)
    @user.trips.each do |trip|
      if trip.id != self.id
        if self.start > trip.start && self.start < trip.end
          errors.add(:start_date, "#{:start_date.to_s.split("_").join(" ").capitalize} cannot be during an existing trip.")
        elsif self.end > trip.start && self.end < trip.end
          errors.add(:end_date, "#{:end_date.to_s.split("_").join(" ").capitalize} cannot be during an existing trip.")
        elsif self.start < trip.start && self.end > trip.end
          errors.add(:trip_dates, "#{:trip_dates.to_s.split("_").join(" ").capitalize} cannot be overlapping with an existing trip.")
        end
      end
    end
  end

end
