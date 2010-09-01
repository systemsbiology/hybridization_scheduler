class ReservationsController < InheritedResources::Base
  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @reservations.collect{|r| r.summary_hash} }
    end
  end

  def create
    # merge in the user identity from the session
    @reservation = Reservation.new( params["reservation"].merge({:user_login => session[:cas_user]}) )
    create!
  end

  def update
    @reservation = Reservation.find(params[:id])

    # merge in the user identity from the session
    @reservation.update_attributes( params["reservation"].merge({:user_login => session[:cas_user]}) )

    super do |format|
      format.json { render :json => @reservation }
    end
  end
end
