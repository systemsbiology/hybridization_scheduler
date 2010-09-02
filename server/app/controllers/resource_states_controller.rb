class ResourceStatesController < InheritedResources::Base
  before_filter :admin_required, :except => :index

  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @resource_states.collect{|s| s.summary_hash} }
    end
  end
end
