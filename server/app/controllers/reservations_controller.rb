class ReservationsController < InheritedResources::Base
  skip_before_filter :verify_authenticity_token

  respond_to :html, :json

  def index
    super do |format|
      format.json { render :json => @reservations.collect{|r| r.summary_hash} }
    end
  end

  def create
    # merge in the user identity from the session
    user_login = session[:cas_user] || "guest"
    @reservation = Reservation.new( params["reservation"].merge({:user_login => user_login}) )
    create!
  end

  def update
    @reservation = Reservation.find(params[:id])

    # merge in the user identity from the session
    user_login = session[:cas_user] || "guest"
    @reservation.update_attributes( params["reservation"].merge({:user_login => user_login}) )

    super do |format|
      format.json { render :json => @reservation }
    end
  end
end
