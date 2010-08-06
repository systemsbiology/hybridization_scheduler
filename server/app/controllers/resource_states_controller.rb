class ResourceStatesController < ApplicationController
  # GET /resource_states
  # GET /resource_states.xml
  def index
    @resource_states = ResourceState.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @resource_states }
    end
  end

  # GET /resource_states/1
  # GET /resource_states/1.xml
  def show
    @resource_state = ResourceState.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @resource_state }
    end
  end

  # GET /resource_states/new
  # GET /resource_states/new.xml
  def new
    @resource_state = ResourceState.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @resource_state }
    end
  end

  # GET /resource_states/1/edit
  def edit
    @resource_state = ResourceState.find(params[:id])
  end

  # POST /resource_states
  # POST /resource_states.xml
  def create
    @resource_state = ResourceState.new(params[:resource_state])

    respond_to do |format|
      if @resource_state.save
        format.html { redirect_to(@resource_state, :notice => 'Resource state was successfully created.') }
        format.xml  { render :xml => @resource_state, :status => :created, :location => @resource_state }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @resource_state.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /resource_states/1
  # PUT /resource_states/1.xml
  def update
    @resource_state = ResourceState.find(params[:id])

    respond_to do |format|
      if @resource_state.update_attributes(params[:resource_state])
        format.html { redirect_to(@resource_state, :notice => 'Resource state was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @resource_state.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /resource_states/1
  # DELETE /resource_states/1.xml
  def destroy
    @resource_state = ResourceState.find(params[:id])
    @resource_state.destroy

    respond_to do |format|
      format.html { redirect_to(resource_states_url) }
      format.xml  { head :ok }
    end
  end
end
