class AdminUser < ActiveRecord::Base
  validates_presence_of :login
  validates_uniqueness_of :login

  def summary_hash
    {
      :id => id,
      :login => login
    }
  end

  def self.include?(login)
    AdminUser.where(:login => login).size > 0
  end

end
