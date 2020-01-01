module ActivitiesHelper
  cattr_accessor :params

  def activity_start_before_end
    if self.start > self.end
      errors.add(:start_of_activity, "cannot be after end of activity.")
    end
  end

  def activity_trip_date_confirm
    @trip = Trip.find_by(id: params[:trip_id])
    if self.end > @trip.end || self.end < @trip.start
      errors.add(:new_activity, "cannot be outside the current trip's dates.")
    elsif self.start < @trip.start || self.start > @trip.end 
    	errors.add(:new_activity, "cannot be outside the current trip's dates.")
    end
  end 

  def activities_date_confirm
  	@trip = Trip.find_by(id: params[:trip_id])
  	@activities = @trip.activities
  	@activities.each do |activity|
  		if activity.id != self.id 
  			if self.start > activity.start && self.start < activity.end 
  				errors.add(:new_activity, "cannot overlap with an existing activity.")
  			elsif self.end > activity.start && self.end < activity.end 
  				errors.add(:new_activity, "cannot overlap with an existing activity.")
  			elsif self.start < activity.start && self.end > activity.end 
  				errors.add(:new_activity, "cannot overlap with an existing activity.")
  			end
  		end
    end
  end	
end
