class Resource < ActiveRecord::Base
  has_many :resource_states

  validates_presence_of :name, :number
  validates_uniqueness_of :name
end
