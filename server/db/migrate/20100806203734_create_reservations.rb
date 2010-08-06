class CreateReservations < ActiveRecord::Migration
  def self.up
    create_table :reservations do |t|
      t.date :date
      t.string :user_login
      t.integer :sample_type_id
      t.integer :sample_number
      t.integer :chip_number

      t.timestamps
    end
  end

  def self.down
    drop_table :reservations
  end
end
