class AdminUser < ActiveRecord::Base
  validates_presence_of :login
  validates_uniqueness_of :login
end
