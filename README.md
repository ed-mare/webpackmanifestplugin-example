# README

This app demonstrates the use of the WebpackManifestPlugin gem https://github.com/ed-mare/webpack_manifest_plugin.
It is known to work with these dependencies:

- Rails 5.1.x
- Ruby 2.4.1
- Node v8.4.0
- NPM 5.3.0
- Webpack 3.5.4

It uses ES6 which is transpiled by Babel.

**Run this app in development environment only.**

## Setup

#### Without Docker

1) Install nodejs and npm on your system.
2) Checkout this repository, `cd` to the root of the app and run:

```shell
# install gems
bundle install

# install packages
npm install

# create the assets with webpack - depends on how you installed it

# use development assets
webpack

# use versioned assets
webpack --config webpack.config.prod.js  

# start server - go to http://localhost:3000
bundle exec rails s -p 3000
```

#### With Docker

Checkout this repository, `cd` to the root of the app and run:

```shell
# build the web image
docker-compose build

# run this if public/assets aren't created when the image is built
docker-compose run --rm web node node_modules/webpack/bin/webpack

# start the server - go to http://localhost:3000
docker-compose up
```

To run commands in an interactive shell:

```shell
# start bash session
docker-compose run --rm web /bin/bash

# run your tasks, i.e.,
npm install
bundle install
node node_modules/webpack/bin/webpack

# alternative to the above
rake webpack_manifest_plugin:build
# or create production assets
rake webpack_manifest_plugin:build['-d -w --config webpack.config.prod.js']
```

## Notes

#### Configurations

Configurations are in config/initializers/webpack_manifest_plugin.rb

#### Webpack Configs

There are two webpack configs:

- webpack.config.js does not version assets. For development.
- webpack.config.prod.js versions assets. For production.

#### Files

- Assets folder structure is the same as a standard Rails app but files are imported ES6 style.
- Assets are copied to `public/assets`, same as standard Rails app.
- The manifest.json file is created in `public/assets`.
- `views/layouts/application.html.erb`, `views/main/application.html.erb` use the view helper.
