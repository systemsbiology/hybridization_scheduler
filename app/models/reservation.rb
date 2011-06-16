class Reservation < ActiveRecord::Base
  validates_presence_of :date, :user_login
  validates_presence_of :sample_type_id, :sample_number, :chip_number, :description, :unless => :blocking

  def summary_hash
    {
      :id => id,
      :date => date,
      :user_login => user_login,
      :description => description,
      :sample_type_id => sample_type_id,
      :sample_number => sample_number,
      :chip_number => chip_number,
      :blocking => blocking
    }
  end
end
