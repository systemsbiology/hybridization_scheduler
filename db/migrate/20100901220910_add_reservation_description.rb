class AddReservationDescription < ActiveRecord::Migration
  def self.up
    add_column :reservations, :description, :string
  end

  def self.down
    remove_column :reservations, :description
  end
end
