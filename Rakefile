require 'fileutils'

namespace :build do
  desc "Build the UI and put under the server's public folder"
  task :ui do
    puts "== Building the SproutCore application(s)"
    system("sc-build")

    puts "== Placing the built application(s) under the server's public folder"
    FileUtils.rm_rf Dir.glob("server/public/static/*")
    FileUtils.rm_rf Dir.glob("server/public/ui/*")
    FileUtils.mv Dir.glob("tmp/build/scheduler/static/*"), "server/public/static/"

    FileUtils.cp Dir.glob("server/public/static/calendar/en/*/index.html").first, "server/public/ui/calendar.html"

    puts "== UI building complete"
  end
end
