class HybridizationResource < ActiveRecord::Base
  has_many :resource_states

  validates_presence_of :name, :number
  validates_uniqueness_of :name

  def summary_hash
    {
      :id => id,
      :name => name,
      :number => number
    }
  end
end
