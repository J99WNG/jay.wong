# Ruby Upgrade & Jekyll Setup Guide

Follow these steps to upgrade Ruby and get Jekyll running locally.

## Step 1: Install Homebrew

Open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

This will prompt you for your password (sudo access required). Follow the on-screen instructions.

**After installation**, you may see a message like:
```
==> Next steps:
- Run these commands in your terminal to add Homebrew to your PATH:
  echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
  eval "$(/opt/homebrew/bin/brew shellenv)"
```

Run those commands if shown.

## Step 2: Install Ruby 3.3 (Recommended)

**Important:** Use Ruby 3.3.x instead of 4.0, as Jekyll doesn't fully support Ruby 4.0 yet.

```bash
brew install ruby@3.3
```

Or if you want the latest 3.3 version:
```bash
brew install rbenv ruby-build
rbenv install 3.3.6
rbenv global 3.3.6
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

## Step 3: Add Ruby to Your PATH

**If using Homebrew Ruby 3.3:**
```bash
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**If using rbenv (recommended):**
The PATH is automatically set when you run `rbenv init`.

## Step 4: Verify Ruby Version

```bash
ruby --version
```

You should see Ruby 3.x.x (not 2.6.x)

## Step 5: Clean Up Old Jekyll Installation

Navigate to your project directory and remove old dependencies:

```bash
cd "/Users/jaywong/Library/CloudStorage/GoogleDrive-jasonwongdesigns@gmail.com/My Drive/[01] JW/[06] Website/JW 2025"
rm -rf vendor/bundle Gemfile.lock
```

## Step 6: Install Jekyll Dependencies

```bash
bundle install
```

## Step 7: Run Jekyll Locally

```bash
bundle exec jekyll serve
```

Your site will be available at: **http://localhost:4000/jay.wong/**

## Troubleshooting

- **"command not found: brew"**: Make sure you completed Step 1 and ran the PATH commands
- **Still seeing Ruby 2.6**: Make sure you ran `source ~/.zshrc` after adding the PATH
- **Port 4000 in use**: Use `bundle exec jekyll serve --port 4001`
- **Auto-refresh on changes**: Use `bundle exec jekyll serve --livereload`

## Quick Commands Reference

- Start server: `bundle exec jekyll serve`
- Build site: `bundle exec jekyll build`
- Watch for changes: `bundle exec jekyll serve --livereload`
- Check Jekyll version: `bundle exec jekyll --version`

