# Deployment Guide — GitHub Pages

This guide provides step-by-step instructions for deploying your portfolio website to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer
- All portfolio files ready

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Name your repository: `{your-username}.github.io`
   - Replace `{your-username}` with your actual GitHub username
   - Example: `rameshpkhade.github.io`
5. Add a description (optional): "My Professional Portfolio"
6. Choose **Public** (required for GitHub Pages)
7. Click **Create repository**

## Step 2: Initialize Git Locally

1. Open your terminal/command prompt
2. Navigate to your portfolio directory:
   ```bash
   cd /path/to/portfolio-final
   ```
3. Initialize a new Git repository:
   ```bash
   git init
   ```
4. Add all files:
   ```bash
   git add .
   ```
5. Create your first commit:
   ```bash
   git commit -m "Initial portfolio commit"
   ```

## Step 3: Connect to GitHub

1. Add the remote repository URL:
   ```bash
   git remote add origin https://github.com/{your-username}/{your-username}.github.io.git
   ```
   - Replace `{your-username}` with your GitHub username

2. Rename the branch to `main` (if needed):
   ```bash
   git branch -M main
   ```

3. Push your files to GitHub:
   ```bash
   git push -u origin main
   ```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** section
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch
6. Click **Save**
7. Wait 1-2 minutes for the site to build and deploy

## Step 5: Access Your Website

Your portfolio is now live at:
```
https://{your-username}.github.io
```

Example: `https://rameshpkhade.github.io`

## Updating Your Portfolio

To make changes and update your website:

1. Edit files locally
2. Commit changes:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   ```
3. Push to GitHub:
   ```bash
   git push
   ```

Your website will automatically update within a few minutes.

## Using a Custom Domain (Optional)

### If you have a custom domain:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS settings to point to GitHub Pages:
   - **CNAME**: `{your-username}.github.io`
   - Or use GitHub's IP addresses (see GitHub Pages documentation)

3. In your GitHub repository:
   - Create a file named `CNAME` in the root directory
   - Add your domain name (e.g., `rameshkhade.com`)
   - Commit and push

4. Go to repository **Settings** → **Pages**
5. Under "Custom domain", enter your domain
6. Check "Enforce HTTPS"
7. Wait for DNS verification (can take up to 24 hours)

## Troubleshooting

### Site not showing up
- Wait 1-2 minutes after pushing
- Check that repository is public
- Verify `index.html` is in the root directory

### 404 errors on subpages
- Ensure all HTML files are in the root directory
- Check that links use correct relative paths
- Verify file names match links exactly

### Images not loading
- Use absolute URLs (https://...) for external images
- Or place images in a folder and use relative paths
- Check image URLs are accessible

### Dark mode not working
- Clear browser cache (Ctrl+Shift+Delete)
- Check that `scripts.js` is loading (F12 → Console)
- Verify localStorage is enabled in browser

## Performance Tips

1. **Optimize Images**
   - Use compressed images
   - Use appropriate image formats (JPEG, PNG, WebP)
   - Consider using CDN for images

2. **Minify CSS/JS** (Optional)
   - Use online tools to minify files
   - Reduces file size and improves load time

3. **Enable Caching**
   - GitHub Pages automatically caches static files
   - Use cache-busting for updates if needed

4. **Monitor Performance**
   - Use Google PageSpeed Insights
   - Check Lighthouse scores in Chrome DevTools

## Maintenance

### Regular Updates
- Update project data in `projects-data.js`
- Add new projects as needed
- Update experience and skills sections

### Backup
- Keep a local copy of all files
- Use Git branches for experimental changes
- Tag releases for version control

### Security
- Keep GitHub account secure (2FA enabled)
- Don't commit sensitive information
- Review GitHub security advisories

## Advanced Deployment Options

### Using GitHub Actions
For automated builds and deployments:

1. Create `.github/workflows/deploy.yml` in your repository
2. Add workflow configuration for automatic deployment
3. Commits to main branch trigger automatic deployment

### Using Netlify (Alternative)
1. Go to [Netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Netlify automatically deploys on push
4. Offers more advanced features and analytics

### Using Vercel (Alternative)
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Automatic deployment on every push
4. Better performance and analytics

## Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-custom-domains-and-github-pages)
- [GitHub Community Forum](https://github.community)

---

**Deployment Date**: November 15, 2025
**Status**: Ready for GitHub Pages
