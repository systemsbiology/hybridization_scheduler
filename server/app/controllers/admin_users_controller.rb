class AdminUsersController < ApplicationController
  # GET /admin_users
  # GET /admin_users.xml
  def index
    @admin_users = AdminUser.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @admin_users }
    end
  end

  # GET /admin_users/1
  # GET /admin_users/1.xml
  def show
    @admin_user = AdminUser.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @admin_user }
    end
  end

  # GET /admin_users/new
  # GET /admin_users/new.xml
  def new
    @admin_user = AdminUser.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @admin_user }
    end
  end

  # GET /admin_users/1/edit
  def edit
    @admin_user = AdminUser.find(params[:id])
  end

  # POST /admin_users
  # POST /admin_users.xml
  def create
    @admin_user = AdminUser.new(params[:admin_user])

    respond_to do |format|
      if @admin_user.save
        format.html { redirect_to(@admin_user, :notice => 'Admin user was successfully created.') }
        format.xml  { render :xml => @admin_user, :status => :created, :location => @admin_user }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @admin_user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin_users/1
  # PUT /admin_users/1.xml
  def update
    @admin_user = AdminUser.find(params[:id])

    respond_to do |format|
      if @admin_user.update_attributes(params[:admin_user])
        format.html { redirect_to(@admin_user, :notice => 'Admin user was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @admin_user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin_users/1
  # DELETE /admin_users/1.xml
  def destroy
    @admin_user = AdminUser.find(params[:id])
    @admin_user.destroy

    respond_to do |format|
      format.html { redirect_to(admin_users_url) }
      format.xml  { head :ok }
    end
  end
end
