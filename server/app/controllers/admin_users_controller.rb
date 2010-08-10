class AdminUsersController < InheritedResources::Base
  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @admin_users.collect{|u| u.summary_hash} }
    end
  end
end
