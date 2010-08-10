class Reservation < ActiveRecord::Base
  validates_presence_of :date, :user_login, :sample_type_id, :sample_number, :chip_number

  def summary_hash
    {
      :id => id,
      :date => date,
      :user_login => user_login,
      :sample_type_id => sample_type_id,
      :sample_number => sample_number,
      :chip_number => chip_number
    }
  end
end
