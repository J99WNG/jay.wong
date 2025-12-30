# Jekyll Local Development Setup

## Prerequisites

This site requires **Ruby 3.0 or higher** to run Jekyll locally.

### Check your Ruby version:
```bash
ruby --version
```

### If you need to upgrade Ruby:

**Option 1: Using Homebrew (Recommended for macOS)**
```bash
# Install Homebrew if you don't have it:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby:
brew install ruby

# Add to your ~/.zshrc (or ~/.bash_profile):
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Option 2: Using rbenv (Ruby version manager)**
```bash
# Install rbenv:
brew install rbenv ruby-build

# Install Ruby 3.2:
rbenv install 3.2.0
rbenv global 3.2.0

# Add to your ~/.zshrc:
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

## Setup Steps

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Run Jekyll locally:**
   ```bash
   bundle exec jekyll serve
   ```

3. **View your site:**
   Open your browser to: `http://localhost:4000/jay.wong/`
   
   Note: The URL includes `/jay.wong` because that's your `baseurl` in `_config.yml`.

## Development Commands

- **Start server:** `bundle exec jekyll serve`
- **Build site:** `bundle exec jekyll build`
- **Watch for changes:** `bundle exec jekyll serve --livereload` (auto-refresh browser)
- **Draft mode:** `bundle exec jekyll serve --drafts` (include draft posts)

## Troubleshooting

- **Port already in use?** Use: `bundle exec jekyll serve --port 4001`
- **Clear cache:** Delete `_site/` folder and `.jekyll-cache/` folder
- **Check Jekyll version:** `bundle exec jekyll --version`

## GitHub Pages

Your site will automatically build on GitHub Pages when you push to your repository. Make sure:
- Jekyll is enabled in your repository Settings → Pages
- Your `_config.yml` has the correct `baseurl` set

