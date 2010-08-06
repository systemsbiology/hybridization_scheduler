class Reservation < ActiveRecord::Base
  validates_presence_of :date, :user_login, :sample_type_id, :sample_number, :chip_number
end
