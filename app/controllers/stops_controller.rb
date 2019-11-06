class StopsController < ApplicationController
	before_action :set_stop, only: [:show, :edit, :update, :destroy]
  before_action :set_trip, except: [:all_stops]
  before_action :set_user
  before_action :require_login
  skip_before_action :verify_authenticity_token

  def index
    @stops = @trip.stops
    flash[:warning] = "You do not have any stops added for this trip yet!" if @stops.length == 0
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @stops }
    end
  end

  def show
    respond_to do |f|
      f.html { render :show }
      f.json { render json: @stop }
    end
  end

  def new
    @stop = Stop.new
  end

  def create
    if @stop = @trip.stops.create(stop_params)
      respond_to do |f|
        f.html { redirect_to trip_stop_path(@trip, @stop) }
        f.json {render json: @stop }
      end
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @stop.update(stop_params)
      redirect_to trip_stop_path(@trip, @stop)
    else
      render :edit
    end
  end

  def destroy
    @stop.destroy
    redirect_to trip_stops_path(@user)
  end

  def all_stops
    @stops = @user.trips.collect do |trip| 
      trip.stops.each do |stop|
        stop 
      end
    end.flatten
    flash[:warning] = "You do not have any stops for any trips!" if @stops.length == 0
  end

  private

  def stop_params
    params.require(:stop).permit(:location, :arr_date, :dep_date, :restrictions, :trip_id)
  end

  def set_trip
    @trip = Trip.find(params[:trip_id])
  end

  def set_user
    @user = current_user
  end

  def set_stop
  	@stop = Stop.find(params[:id])
  end

end
