module FlightsHelper
  cattr_accessor :params

  def flight_start_before_end
    if self.departure > self.arrival
      errors.add(:departure, "cannot be after arrival.")
    end
  end

  def flight_trip_date_confirm
    @trip = Trip.find_by(id: params[:trip_id])
    if self.arrival > @trip.end || self.arrival < @trip.start
      errors.add(:new_flight, "cannot be outside the current trip's dates.")
    elsif self.departure < @trip.start || self.departure > @trip.end 
    	errors.add(:new_flight, "cannot be outside the current trip's dates.")
    end
  end 

  def flights_date_confirm
  	@trip = Trip.find_by(id: params[:trip_id])
  	@flights = @trip.flights
  	@flights.each do |flight|
  		if flight.id != self.id 
  			if self.departure > flight.departure && self.departure < flight.arrival 
  				errors.add(:new_flight, "cannot overlap with an existing flight.")
  			elsif self.arrival > flight.departure && self.arrival < flight.arrival 
  				errors.add(:new_flight, "cannot overlap with an existing flight.")
  			elsif self.departure < flight.departure && self.arrival > flight.arrival 
  				errors.add(:new_flight, "cannot overlap with an existing flight.")
  			end
  		end
    end
  end

end