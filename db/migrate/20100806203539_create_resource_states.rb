class CreateResourceStates < ActiveRecord::Migration
  def self.up
    create_table :resource_states do |t|
      t.string :name
      t.integer :sample_limit
      t.integer :chip_limit
      t.integer :resource_id

      t.timestamps
    end
  end

  def self.down
    drop_table :resource_states
  end
end
