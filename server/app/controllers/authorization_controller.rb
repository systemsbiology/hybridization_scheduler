class AuthorizationController < ApplicationController
  respond_to :json

  def role
    if AdminUser.include? session[:cas_user]
      render :json => {:role => "admin"}
    else
      render :json => {:role => "customer"}
    end
  end

end
