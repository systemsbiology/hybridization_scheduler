# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Server::Application.initialize!

require 'casclient/frameworks/rails/filter'

CASClient::Frameworks::Rails::Filter.configure(
  :cas_base_url => App.rubycas_server
)
