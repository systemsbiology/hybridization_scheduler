class ApplicationController < ActionController::Base
  protect_from_forgery

  # Simple authorization
  def admin_required
    App.authentication_disabled || AdminUser.include?(session[:cas_user])
  end

  # RubyCAS-client
  require 'casclient/frameworks/rails/filter'
  unless App.authentication_disabled
    before_filter CASClient::Frameworks::Rails::Filter
  end
end
