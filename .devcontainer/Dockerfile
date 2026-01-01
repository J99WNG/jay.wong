FROM ruby:3.3-slim

# Install dependencies for Jekyll
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Jekyll and Bundler
RUN gem install jekyll bundler

WORKDIR /workspaces/my-website