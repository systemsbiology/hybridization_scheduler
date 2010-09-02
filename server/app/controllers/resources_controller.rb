class ResourcesController < InheritedResources::Base
  before_filter :admin_required, :except => :index

  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @resources.collect{|r| r.summary_hash} }
    end
  end
end
