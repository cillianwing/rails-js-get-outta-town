class UsersController < ApplicationController
	before_action :require_login, only: [:index, :show, :edit, :update, :destroy]
	before_action :set_user, only: [:index, :show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @trip = Trip.new
    @trips = @user.trips
    @trips_upcoming_sorted = @user.trips.select { |trip| trip if trip[:start] > Date.today }.sort_by { |trip| trip[:start] }
    @trips_past_sorted = @user.trips.select { |trip| trip if trip[:end] < Date.today }.sort_by { |trip| trip[:start] }
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to users_path
    else
      render :new
    end
  end

  def show
    if current_user.id != params[:id].to_i
      redirect_to users_path, flash: { warning: "You cannot view another user's profile." }
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to user_path
    else
      render :edit
    end
  end

  def destroy
    @user.destroy
    redirect_to root_path
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :bio, :location, :email, :password, :password_confirmation)
  end
end
