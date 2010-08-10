class SampleTypesController < InheritedResources::Base
  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @sample_types.collect{|t| t.summary_hash} }
    end
  end
end
