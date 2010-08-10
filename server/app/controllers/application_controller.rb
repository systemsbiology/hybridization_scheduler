class ApplicationController < ActionController::Base
  protect_from_forgery

  # RubyCAS-client
  before_filter CASClient::Frameworks::Rails::Filter
end
