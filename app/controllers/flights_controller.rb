class FlightsController < ApplicationController
	before_action :set_flight, only: [:show, :edit, :update, :destroy]
  before_action :set_trip, except: [:all_flights]
  before_action :set_user
  before_action :require_login
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
    if @flight = @trip.flights.create(flight_params)
      respond_to do |f|
        f.html { redirect_to trip_flight_path(@trip, @flight) }
        f.json {render json: @flight }
      end
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

  def all_stops
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

end
