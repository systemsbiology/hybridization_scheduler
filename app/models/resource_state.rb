class ResourceState < ActiveRecord::Base
  belongs_to :hybridization_resource

  has_many :requirements

  def resource_and_state_name
    if name && name.length > 0
      "#{hybridization_resource.name} (#{name})"
    else
      hybridization_resource.name
    end
  end

  def summary_hash
    {
      :id => id,
      :name => name,
      :sample_limit => sample_limit,
      :chip_limit => chip_limit,
      :resource_id => hybridization_resource_id
    }
  end
end
