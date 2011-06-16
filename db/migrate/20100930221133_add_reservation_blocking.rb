class AddReservationBlocking < ActiveRecord::Migration
  def self.up
    add_column :reservations, :blocking, :boolean, :default => false
  end

  def self.down
    remove_column :reservations, :blocking
  end
end
