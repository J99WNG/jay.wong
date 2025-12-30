# Jekyll Local Development - Troubleshooting

## Current Status

We've set up:
- ✅ Ruby 3.1.6, 3.2.6, and 3.3.6 installed via rbenv
- ✅ Jekyll dependencies installed
- ⚠️ Jekyll has a loading issue with filter modules

## The Issue

Jekyll is encountering an error loading filter modules (`URLFilters`, `GroupingFilters`, `DateFilters`). This appears to be related to how the `require_all` method loads files in the Jekyll gem.

## Workaround: Use GitHub Pages Build

Since your site is hosted on GitHub Pages, you can:

1. **Make changes locally** in your HTML/CSS/JS files
2. **Commit and push** to GitHub
3. **GitHub Pages will build automatically** using their Jekyll setup
4. **View the built site** on your GitHub Pages URL

Your `_layouts` and `_includes` will work correctly on GitHub Pages even if local Jekyll isn't running.

## Alternative: Manual Testing

You can test your HTML/CSS/JS changes by:
1. Opening `index.html` directly in a browser (though layouts won't be processed)
2. Using a simple HTTP server: `python3 -m http.server 8000`
3. Relying on GitHub Pages for the full Jekyll build

## Next Steps

1. **For now**: Use GitHub Pages for building
2. **Monitor**: Check if Jekyll releases a fix for this issue
3. **Alternative**: Consider using a Docker container with a known-working Jekyll setup

## Quick Commands

```bash
# Set Ruby version (if needed)
export PATH="/opt/homebrew/bin:$PATH"
eval "$(rbenv init - zsh)"
rbenv global 3.1.6  # or 3.2.6, 3.3.6

# Check Ruby version
ruby --version

# View your site on GitHub Pages
# (after pushing to GitHub)
```

