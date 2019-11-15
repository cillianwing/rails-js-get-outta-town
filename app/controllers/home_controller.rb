class HomeController < ApplicationController
  def index
  	if logged_in?
  		redirect_to users_path
  	else
  		@user = User.new
  		render :index
  	end
  end
end
