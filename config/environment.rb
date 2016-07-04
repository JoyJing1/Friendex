# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

API_KEYS = YAML.load_file("#{Rails.root}/config/api_keys.yml")
