module AccommodationsHelper
  cattr_accessor :params

  def accommodation_start_before_end
    if self.check_in > self.check_out
      errors.add(:check_in, "cannot be after check out.")
    end
  end

  def accommodation_trip_date_confirm
    @trip = Trip.find_by(id: params[:trip_id])
    if self.check_out > @trip.end || self.check_out < @trip.start
      errors.add(:new_accommodation, "cannot be outside the current trip's dates.")
    elsif self.check_in < @trip.start || self.check_in > @trip.end 
    	errors.add(:new_accommodation, "cannot be outside the current trip's dates.")
    end
  end 

  def accommodations_date_confirm
  	@trip = Trip.find_by(id: params[:trip_id])
  	@accommodations = @trip.accommodations
  	@accommodations.each do |accommodation|
  		if accommodation.id != self.id 
  			if self.check_in > accommodation.check_in && self.check_in < accommodation.check_out 
  				errors.add(:new_accommodation, "cannot overlap with an existing accommodation.")
  			elsif self.check_out > accommodation.check_in && self.check_out < accommodation.check_out 
  				errors.add(:new_accommodation, "cannot overlap with an existing accommodation.")
  			elsif self.check_in < accommodation.check_in && self.check_out > accommodation.check_out 
  				errors.add(:new_accommodation, "cannot overlap with an existing accommodation.")
  			end
  		end
    end
  end		
end
