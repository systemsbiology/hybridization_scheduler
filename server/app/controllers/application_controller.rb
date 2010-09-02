class ApplicationController < ActionController::Base
  protect_from_forgery

  # Simple authorization
  def admin_required
    AdminUser.include? session[:cas_user]
  end

  # RubyCAS-client
  before_filter CASClient::Frameworks::Rails::Filter
end
