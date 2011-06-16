require 'fileutils'

namespace :build do
  desc "Build the UI and put under the server's public folder"
  task :ui do
    puts "== Building the SproutCore application(s)"
    system("cd app/sproutcore; bundle exec sc-build")

    puts "== Placing the built application(s) under the server's public folder"
    FileUtils.rm_rf Dir.glob("public/static/*")
    FileUtils.rm_rf Dir.glob("public/ui/*")
    FileUtils.mv Dir.glob("app/sproutcore/tmp/build/scheduler/static/*"), "public/static/"

    FileUtils.cp Dir.glob("public/static/calendar/en/*/index.html").first, "public/ui/calendar.html"

    puts "== UI building complete"
  end
end
