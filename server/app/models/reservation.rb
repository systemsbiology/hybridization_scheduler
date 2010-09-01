class Reservation < ActiveRecord::Base
  validates_presence_of :date, :user_login, :sample_type_id, :sample_number, :chip_number, :description

  def summary_hash
    {
      :id => id,
      :date => date,
      :user_login => user_login,
      :description => description,
      :sample_type_id => sample_type_id,
      :sample_number => sample_number,
      :chip_number => chip_number
    }
  end
end
