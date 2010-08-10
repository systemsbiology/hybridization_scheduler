class RequirementsController < InheritedResources::Base
  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @requirements.collect{|r| r.summary_hash} }
    end
  end
end
