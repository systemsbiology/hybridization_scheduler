class HybridizationResourcesController < InheritedResources::Base
  before_filter :admin_required, :except => :index

  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @hybridization_resources.collect{|r| r.summary_hash} }
    end
  end
end
