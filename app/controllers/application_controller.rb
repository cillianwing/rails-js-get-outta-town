class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    @user = User.find_by(id: session[:user_id]) || User.new
  end

  def current_trip
    @trip = Trip.find_by(id: params[:trip_id])
  end

  def logged_in?
    current_user.id != nil
  end

  def require_login
    return redirect_to login_path, alert: "Please log in." unless logged_in?
  end

  def check_user
    if current_user.id != params[:user_id].to_i
      redirect_to users_path, alert: "You cannot view another user's profile."
    else
      true
    end
  end

  helper_method :current_user, :current_trip

end
