class SampleType < ActiveRecord::Base
  has_many :requirements
  has_many :reservations

  validates_presence_of :name
  validates_uniqueness_of :name
end
