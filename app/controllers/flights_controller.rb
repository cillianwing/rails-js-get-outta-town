class FlightsController < ApplicationController
	before_action :set_flight, only: [:show, :edit, :update, :destroy]
  before_action :set_trip, except: [:all_flights]
  before_action :set_user
  before_action :require_login
  before_action :helper_params
  skip_before_action :verify_authenticity_token

  def index
    @flights = @trip.flights
    flash[:warning] = "You do not have any flights added for this trip yet!" if @flights.length == 0
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @flights }
    end
  end

  def show
    respond_to do |f|
      f.html { render :show }
      f.json { render json: @flight }
    end
  end

  def new
    @flight = Flight.new
  end

  def create
    @flight = Flight.new(flight_params)
    if @flight.valid?
      @valid_flight = @trip.flights.create(flight_params)
      redirect_to trip_flight_path(@trip, @valid_flight)
    else
      render :new 
    end
  end

  def edit
  end

  def update
    if @flight.update(flight_params)
      redirect_to trip_flight_path(@trip, @flight)
    else
      render :edit
    end
  end

  def destroy
    @flight.destroy
    redirect_to trip_flights_path(@trip)
  end

  def all_flights
    @flights = @user.trips.collect do |trip| 
      trip.flights.each do |flight|
        flight 
      end
    end.flatten
    flash[:warning] = "You do not have any flights for any trips!" if @flights.length == 0
  end

  private

  def flight_params
    params.require(:flight).permit(:confirm_num, :airline, :flight_num, :departure, :arrival, :dep_loc, :arr_loc, :checked_bags, :cost)
  end

  def set_trip
    @trip = current_trip
  end

  def set_user
    @user = current_user
  end

  def set_flight
  	@flight = Flight.find(params[:id])
  end

  def helper_params
    FlightsHelper.params = params
  end

end
