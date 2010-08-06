class CreateRequirements < ActiveRecord::Migration
  def self.up
    create_table :requirements do |t|
      t.integer :sample_type_id
      t.integer :resource_state_id

      t.timestamps
    end
  end

  def self.down
    drop_table :requirements
  end
end
