class RenameResourceTable < ActiveRecord::Migration
  def self.up
    rename_table :resources, :hybridization_resources
    rename_column :resource_states, :resource_id, :hybridization_resource_id
  end

  def self.down
    rename_table :hybridization_resources, :resources
    rename_column :resource_states, :hybridization_resource_id, :resource_id
  end
end
