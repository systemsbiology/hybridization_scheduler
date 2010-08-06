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
end
