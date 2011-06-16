class SampleTypesController < InheritedResources::Base
  before_filter :admin_required, :except => :index

  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @sample_types.collect{|t| t.summary_hash} }
    end
  end
end
