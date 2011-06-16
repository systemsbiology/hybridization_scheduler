class Requirement < ActiveRecord::Base
  belongs_to :sample_type
  belongs_to :resource_state

  validates_presence_of :sample_type_id, :resource_state_id

  def summary_hash
    {
      :id => id,
      :sample_type_id => sample_type_id,
      :resource_state_id => resource_state_id
    }
  end
end
