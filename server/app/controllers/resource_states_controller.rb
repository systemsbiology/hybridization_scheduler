class ResourceStatesController < InheritedResources::Base
  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @resource_states.collect{|s| s.summary_hash} }
    end
  end
end
