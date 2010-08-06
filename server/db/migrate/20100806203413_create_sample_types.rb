class CreateSampleTypes < ActiveRecord::Migration
  def self.up
    create_table :sample_types do |t|
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :sample_types
  end
end
