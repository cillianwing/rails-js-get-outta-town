class TripsController < ApplicationController
  before_action :set_trip, only: [:show, :edit, :update, :destroy]
  before_action :set_user, only: [:index, :show, :new, :create, :edit, :group_trip, :join_group]
  before_action :require_login
  before_action :check_user
  skip_before_action :verify_authenticity_token

  def index
    @trips = @user.trips
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @trips }
    end
  end

  def show
    respond_to do |f|
      f.html { render :show }
      f.json { render json: @trip }
    end
  end

  def new
    @trip = Trip.new
  end

  def create
    if @trip = @user.trips.create(trip_params)
      respond_to do |f|
        f.html { redirect_to user_trip_path(@user, @trip) }
        f.json {render json: @trip }
      end
    else
      render :new
    end
  end

  def edit
    if @user.id == @trip.creator_id
      render :edit
    else
      redirect_to user_trips_path(@user, @trip), flash: { warning: "You can only edit a trip that you created." }
    end
  end

  def update
    if @trip.update(trip_params)
      redirect_to user_trip_path(@user, @trip)
    else
      render :edit
    end
  end

  def destroy
    @trip.destroy
    redirect_to user_trips_path(@user)
  end

  def group_trip
    @trip = Trip.new
    @trips = []
    Trip.upcoming_trips.group_trips.each do |trip|
      @trips << trip if !trip.users.any? { |user| user.id == @user.id}
    end
  end

  def join_group
    @trip = Trip.find(params[:trip][:id])
    @trip.users << @user
    render json: @trip
  end

  private

  def trip_params
    params.require(:trip).permit(:title, :description, :start, :end, :group_trip, :creator_id)
  end

  def set_trip
    @trip = Trip.find(params[:id])
  end

  def set_user
    @user = current_user
  end

end
