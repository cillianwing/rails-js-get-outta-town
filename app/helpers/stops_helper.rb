module StopsHelper

  def stop_start_before_end
    if self.arr_date > self.dep_date
      errors.add(:arrival_date, "cannot be after departure_date.")
    end
  end

  def stop_date_confirm
    @trip = Trip.find_by(id: self.trip_id)
    if self.arr_date > trip.end || self.arr_date < trip.start
      errors.add(:arrival_date, "cannot be outside the current trip's dates.")
    elsif self.dep_date < trip.start || self.dep_date > trip.end 
    	errors.add(:departure_date, "cannot be outside the current trip's dates.")
    end
  end

end
