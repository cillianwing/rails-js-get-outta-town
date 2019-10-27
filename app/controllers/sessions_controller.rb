class SessionsController < ApplicationController
  def new
    redirect_to users_path if logged_in?
    @user = User.new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      user = User.find_or_create_by_omniauth(auth_hash)
      session[:user_id] = user.id
      redirect_to user_path(user), :flash => { success: "Please update profile information or return home to start planning your trips!" }
    else
      @user = User.find_by(email: params[:user][:email])
      if @user
        return redirect_to login_path, :flash => { alert: "Invalid password. Please try again." } unless @user.try(:authenticate, params[:user][:password])
        session[:user_id] = @user.id
        redirect_to users_path
      else
        redirect_to new_user_path, :flash => { alert: "User not found. Please create a new account." }
      end
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
