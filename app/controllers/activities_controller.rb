class ActivitiesController < ApplicationController
	before_action :set_activity, only: [:show, :edit, :update, :destroy]
  before_action :set_trip, except: [:all_activities]
  before_action :set_user
  before_action :require_login
  before_action :helper_params
  skip_before_action :verify_authenticity_token

  def index
    @activities = @trip.activities
    flash[:warning] = "You do not have any activities added for this trip yet!" if @activities.length == 0
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @activities }
    end
  end

  def show
    respond_to do |f|
      f.html { render :show }
      f.json { render json: @activity }
    end
  end

  def new
    @activity = Activity.new
  end

  def create
    @activity = Activity.new(activity_params)
    if @activity.valid?
      @valid_activity = @trip.activities.create(activity_params)
      redirect_to trip_activity_path(@trip, @valid_activity)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @activity.update(activity_params)
      redirect_to trip_activity_path(@trip, @activity)
    else
      render :edit
    end
  end

  def destroy
    @activity.destroy
    redirect_to trip_activities_path(@trip)
  end

  def all_activities
    @activities = @user.trips.collect do |trip| 
      trip.activities.each do |activity|
        activity 
      end
    end.flatten
    flash[:warning] = "You do not have any activities for any trips!" if @activities.length == 0
  end

  private

  def activity_params
    params.require(:activity).permit(:res_num, :title, :description, :address_1, :address_2, :location, :start, :end, :requirements, :cost)
  end

  def set_trip
    @trip = current_trip
  end

  def set_user
    @user = current_user
  end

  def set_activity
  	@activity = Activity.find(params[:id])
  end

  def helper_params
    ActivitiesHelper.params = params
  end  

end
