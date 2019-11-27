class ReviewsController < ApplicationController
  before_action :set_user
  before_action :require_login
  skip_before_action :verify_authenticity_token

  def index
  	@trips = Trip.past_trips
  	@reviews = []
  	@trips.each do |trip| 
  		trip.reviews.each do |review|
  			@reviews << review
  		end
  	end
  end

  def show
  end

  def new
    @review = Review.new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def review_params
    params.require(:review).permit(:comment, :rating, :user_id, :trip_id)
  end

  def set_user
    @user = current_user
  end

end
