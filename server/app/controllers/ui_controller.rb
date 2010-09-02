class UiController < ApplicationController
  layout nil

  def calendar
    render :file => [RAILS_ROOT, "public", "ui", "calendar.html"].join("/")
  end

end
