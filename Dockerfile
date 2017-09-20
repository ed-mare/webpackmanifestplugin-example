FROM ruby:2.4.1

RUN apt-get update -qq && apt-get install -y build-essential libssl-dev nodejs
RUN apt-get install -y npm && npm cache clean -f && npm install -g n && n stable
RUN gem install bundler && mkdir /myapp

WORKDIR /myapp
ADD . /myapp

# Install ruby gems and javascript packages
RUN bundle install && npm install

# Create dev assets
RUN node node_modules/webpack/bin/webpack

# Create production assets
# RUN node node_modules/webpack/bin/webpack --config webpack.config.prod.js

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
