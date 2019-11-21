class AccommodationsController < ApplicationController
	before_action :set_accommodation, only: [:show, :edit, :update, :destroy]
  before_action :set_trip, except: [:all_flights]
  before_action :set_user
  before_action :require_login
  skip_before_action :verify_authenticity_token

  def index
    @accommodations = @trip.accommodations
    flash[:warning] = "You do not have any accommodations added for this trip yet!" if @accommodations.length == 0
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @accommodations }
    end
  end

  def show
    respond_to do |f|
      f.html { render :show }
      f.json { render json: @accommodation }
    end
  end

  def new
    @accommodation = Accommodation.new
  end

  def create
    if @accommodation = @trip.accommodations.create(accommodation_params)
      respond_to do |f|
        f.html { redirect_to trip_accommodation_path(@trip, @accommodation) }
        f.json {render json: @accommodation }
      end
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @accommodation.update(accommodation_params)
      redirect_to trip_accommodation_path(@trip, @accommodation)
    else
      render :edit
    end
  end

  def destroy
    @accommodation.destroy
    redirect_to trip_accommodations_path(@trip)
  end

  def all_flights
    @accommodations = @user.trips.collect do |trip| 
      trip.accommodations.each do |accommodation|
        accommodation 
      end
    end.flatten
    flash[:warning] = "You do not have any accommodations for any trips!" if @accommodations.length == 0
  end

  private

  def accommodation_params
    params.require(:accommodation).permit(:booking_num, :acc_type, :name, :address_1, :address_2, :check_in, :check_out, :cost, :location)
  end

  def set_trip
    @trip = current_trip
  end

  def set_user
    @user = current_user
  end

  def set_accommodation
  	@accommodation = Accommodation.find(params[:id])
  end

end
