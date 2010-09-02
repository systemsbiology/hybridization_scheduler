require 'spec_helper'

describe AuthorizationController do

  describe "GET 'role'" do
    it "should be successful" do
      get 'role'
      response.should be_success
    end
  end

end
