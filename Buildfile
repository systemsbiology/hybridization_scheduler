# ===========================================================================
# Project:   Scheduler
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :scui], :url_prefix => '/scheduler/static',
  :layout => 'shared_assets:index.rhtml', :title => "Microarray Hybridization Scheduler"
