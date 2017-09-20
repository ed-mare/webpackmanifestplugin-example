WebpackManifestPlugin.configure do |c|
  c.webpack_cmd = '/usr/local/bin/node node_modules/webpack/bin/webpack'
  c.cache_manifest =  Rails.env.production? ?  true : false
  c.logger = Rails.logger
end
