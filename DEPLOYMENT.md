# Jimfire Safaris - cPanel Deployment Guide

This guide provides step-by-step instructions for deploying your Jimfire Safaris website to a cPanel hosting environment.

## Prerequisites

- Active cPanel hosting account with:
  - Node.js support (18.x or higher)
  - File Manager or FTP access
  - Terminal/SSH access (recommended)
  - Minimum 512MB RAM
  - 100MB available disk space

## Deployment Steps

### 1. Build the Application Locally

Before deploying, you need to create a production build of your application:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder containing:
- `index.html` - Main HTML file
- `assets/` - Optimized JavaScript, CSS, and images

### 2. Prepare Your cPanel Environment

#### Option A: Using cPanel File Manager (Recommended for beginners)

1. **Login to cPanel**
   - Navigate to your cPanel URL (usually yourdomain.com/cpanel)
   - Enter your cPanel username and password

2. **Navigate to File Manager**
   - Click on "File Manager" in the Files section
   - Navigate to `public_html` (or your domain's document root)

3. **Clean the Directory** (if fresh install)
   - Select all existing files in `public_html`
   - Click "Delete" (backup any existing files first!)

#### Option B: Using FTP Client (Alternative method)

1. **Install an FTP Client** (e.g., FileZilla, Cyberduck)
2. **Get FTP Credentials from cPanel**
   - In cPanel, go to "FTP Accounts"
   - Use the main cPanel account credentials
3. **Connect to your server**
   - Host: ftp.yourdomain.com (or your server IP)
   - Port: 21
   - Username: Your cPanel username
   - Password: Your cPanel password

### 3. Upload the Built Files

#### Using File Manager:

1. **Navigate to `public_html`**
2. **Click "Upload"** button in the top toolbar
3. **Upload ALL files from your local `dist` folder**:
   - `index.html`
   - `assets/` folder (with all contents)
   - `.htaccess` (see step 4 below)

#### Using FTP:

1. **Connect to your server**
2. **Navigate to `public_html` directory**
3. **Drag and drop all files from your local `dist` folder** to the remote `public_html` directory

### 4. Configure URL Rewriting

Single Page Applications (SPAs) like React need special URL handling. Create a `.htaccess` file:

1. **In File Manager**, click "New File"
2. **Name it** `.htaccess` (note the leading dot)
3. **Right-click** and select "Edit"
4. **Paste the following content**:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect all HTTP traffic to HTTPS (optional but recommended)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Handle React Router - send all requests to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Disable directory browsing
Options -Indexes

# Set default charset
AddDefaultCharset UTF-8

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching for static assets
<IfModule mod_expires.c>
  ExpiresActive On
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  
  # HTML
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

5. **Save the file**

### 5. Set Proper File Permissions

Ensure correct file permissions for security:

1. **Select all files and folders** in `public_html`
2. **Click "Permissions"** in the toolbar
3. **Set the following**:
   - Files: `644` (or rw-r--r--)
   - Folders: `755` (or rwxr-xr-x)
4. **Check "Recurse into subdirectories"**
5. **Click "Change Permissions"**

### 6. Configure Domain Settings (if using subdomain)

If you're deploying to a subdomain or addon domain:

1. **In cPanel**, go to "Domains" or "Addon Domains"
2. **Ensure your domain points to the correct directory** containing the uploaded files
3. **Wait for DNS propagation** (can take 24-48 hours for new domains)

## Verification

1. **Visit your website** at https://yourdomain.com
2. **Test all pages and features**:
   - ✅ Homepage loads correctly
   - ✅ Navigation works
   - ✅ Tour packages display
   - ✅ Contact form submits
   - ✅ Admin login works
   - ✅ Images load properly
3. **Test on mobile devices**
4. **Check browser console** for any errors (F12 → Console tab)

## Troubleshooting

### Issue: "404 Not Found" when refreshing pages

**Solution**: Verify `.htaccess` file is in place and `mod_rewrite` is enabled in cPanel

### Issue: Blank white page

**Solution**: 
- Check browser console for JavaScript errors
- Verify all files uploaded correctly
- Check file permissions (files: 644, folders: 755)

### Issue: Images not loading

**Solution**:
- Verify `assets` folder uploaded completely
- Check file paths are correct (case-sensitive on Linux servers)
- Clear browser cache and hard refresh (Ctrl+F5)

### Issue: Styles not applying

**Solution**:
- Ensure CSS files in `assets` folder uploaded
- Check browser console for 404 errors on CSS files
- Clear browser cache

### Issue: Admin features not working

**Solution**:
- The admin authentication uses browser storage - ensure cookies/localStorage are enabled
- Check browser console for API errors
- Verify JavaScript is enabled in browser

## Performance Optimization

### Enable HTTPS (Highly Recommended)

1. **In cPanel**, go to "SSL/TLS Status"
2. **Enable AutoSSL** or install a Let's Encrypt certificate
3. **Force HTTPS** (already configured in `.htaccess` above)

### Setup CDN (Optional)

For better global performance, consider using a CDN like:
- Cloudflare (Free plan available)
- Amazon CloudFront
- StackPath

### Enable PHP OPcache (if available)

In cPanel → Select PHP Version → Extensions → Enable OPcache

## Updating Your Website

When you make changes and need to redeploy:

1. **Build locally**: `npm run build`
2. **Backup current files** on server (optional but recommended)
3. **Delete old `assets` folder** on server
4. **Upload new files from `dist` folder**
5. **Clear browser cache** or do a hard refresh
6. **Test the updated site**

## File Structure After Deployment

Your `public_html` directory should look like this:

```
public_html/
├── .htaccess
├── index.html
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [various image files]
```

## Important Notes

1. **Data Persistence**: This application uses browser localStorage for data persistence. Admin changes (tour packages, testimonials) are stored locally in each user's browser.

2. **No Backend Required**: This is a static site - no PHP, MySQL, or Node.js runtime needed on the server after deployment.

3. **Admin Access**: The admin login is client-side only. For production, consider implementing proper backend authentication.

4. **Regular Backups**: Always backup your site before making updates. Use cPanel's backup wizard.

5. **Monitor Resources**: Check cPanel resource usage to ensure your site performs well.

## Support Resources

- **cPanel Documentation**: https://docs.cpanel.net/
- **Your hosting provider's support**
- **Vite Deployment Guide**: https://vitejs.dev/guide/static-deploy.html

## Security Checklist

- ✅ HTTPS enabled and forced
- ✅ Security headers configured in `.htaccess`
- ✅ Directory browsing disabled
- ✅ Proper file permissions set
- ✅ Regular backups scheduled
- ✅ cPanel password is strong
- ✅ FTP access limited to necessary accounts

## Quick Reference Commands

### Build for production:
```bash
npm run build
```

### Preview build locally before deployment:
```bash
npm run preview
```

### Check build output:
```bash
ls -la dist/
```

---

**Deployment Date**: [Add date when deployed]  
**Deployed By**: [Add your name]  
**Domain**: [Add your domain]  
**Server Location**: [Add cPanel server details]

For technical support with the application itself, contact your web developer.
