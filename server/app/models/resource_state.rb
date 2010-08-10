class ResourceState < ActiveRecord::Base
  belongs_to :resource

  has_many :requirements

  def resource_and_state_name
    if name && name.length > 0
      "#{resource.name} (#{name})"
    else
      resource.name
    end
  end

  def summary_hash
    {
      :id => id,
      :name => name,
      :sample_limit => sample_limit,
      :chip_limit => chip_limit,
      :resource_id => resource_id
    }
  end
end
