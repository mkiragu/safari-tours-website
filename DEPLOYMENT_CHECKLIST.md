# Pre-Deployment Checklist for Jimfire Safaris

## Before Building

- [ ] **Test locally**: Ensure the site works perfectly on `npm run dev`
- [ ] **Check all images load**: Verify all tour package images, vehicle images, and logo display
- [ ] **Test admin dashboard**: Login and verify all CRUD operations work
- [ ] **Test contact form**: Submit a test inquiry
- [ ] **Test responsive design**: Check on mobile, tablet, and desktop
- [ ] **Check browser console**: No errors in developer tools (F12)
- [ ] **Test all navigation links**: Verify smooth scrolling works
- [ ] **Verify data persistence**: Add/edit/delete tours, refresh, confirm data persists

## Content Verification

- [ ] **Company details correct**:
  - [ ] Company name: "Jimfire Safaris"
  - [ ] Email: info@jimfiresafarisandtransfers.com
  - [ ] Phone: +254 724 00 22 99
- [ ] **Tour packages loaded**: At least one tour package exists
- [ ] **Vehicles listed**: All 8 vehicle types added
- [ ] **Testimonials added**: Customer reviews are populated
- [ ] **Logo uploaded**: Custom logo appears in navigation and footer

## Build Preparation

- [ ] **Clean install dependencies**: 
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- [ ] **Run production build**:
  ```bash
  npm run build
  ```
- [ ] **Preview build locally**:
  ```bash
  npm run preview
  ```
- [ ] **Test the preview**: Navigate to http://localhost:4173 and test all features

## Build Output Verification

- [ ] **Check dist folder exists**: `dist/` directory created
- [ ] **index.html present**: Main HTML file in `dist/`
- [ ] **assets folder present**: `dist/assets/` with JS, CSS, and images
- [ ] **File sizes reasonable**: 
  - Total build size should be < 10MB
  - Main JS bundle should be < 2MB
  - Main CSS bundle should be < 500KB
- [ ] **No build errors**: Build completes without errors or warnings

## cPanel Preparation

- [ ] **cPanel login credentials ready**: Username and password available
- [ ] **Domain/subdomain confirmed**: Know exact URL where site will be deployed
- [ ] **Backup current site** (if updating existing site)
- [ ] **FTP credentials available** (if using FTP method)
- [ ] **SSL certificate ready** or AutoSSL enabled

## File Upload Checklist

- [ ] **Upload index.html**: From `dist/` to `public_html/`
- [ ] **Upload assets folder**: Entire `dist/assets/` to `public_html/assets/`
- [ ] **Upload .htaccess**: Copy `.htaccess` file to `public_html/`
- [ ] **Verify file permissions**:
  - Files: 644
  - Folders: 755

## Post-Deployment Verification

- [ ] **Site loads**: Visit https://yourdomain.com
- [ ] **No 404 errors**: Check browser console (F12 → Console)
- [ ] **All images load**: Verify logo, tour images, vehicle images
- [ ] **Styles applied**: Site looks correct, colors and fonts match
- [ ] **Navigation works**: Click all menu items
- [ ] **Smooth scrolling works**: Test anchor links
- [ ] **Forms work**: Test contact form submission
- [ ] **Admin access works**: Login to admin dashboard
- [ ] **Admin CRUD works**: Add/edit/delete a test tour package
- [ ] **Mobile responsive**: Test on phone or use browser DevTools mobile view
- [ ] **HTTPS works**: Site loads with padlock icon
- [ ] **Page refresh works**: Refresh any page, should not show 404

## Performance Checks

- [ ] **Page load time**: Site loads in < 3 seconds
- [ ] **Images optimized**: No images > 1MB in size
- [ ] **Lighthouse score**: Run in Chrome DevTools
  - Performance: > 80
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 80

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Security Checks

- [ ] **HTTPS enforced**: HTTP redirects to HTTPS
- [ ] **Security headers present**: Check response headers
- [ ] **Directory browsing disabled**: Can't browse /assets/ directly
- [ ] **Admin password secure**: Default password changed
- [ ] **.htaccess uploaded**: URL rewriting works

## SEO & Metadata

- [ ] **Page title correct**: "Jimfire Safaris & Transfers - Kenya Safari Tours"
- [ ] **Meta description set**: (if added)
- [ ] **Favicon present**: (if added)
- [ ] **Open Graph tags**: (if added for social sharing)

## Documentation

- [ ] **DEPLOYMENT.md reviewed**: Read through deployment guide
- [ ] **Note deployment date**: Record when deployed
- [ ] **Save server details**: Document hosting provider info
- [ ] **Backup admin credentials**: Store securely

## Rollback Plan

- [ ] **Previous version backed up**: Can restore if issues occur
- [ ] **Know how to restore**: Understand rollback process
- [ ] **Have hosting support contact**: Phone/email for hosting provider

## Final Steps

- [ ] **Clear CDN cache** (if using CDN)
- [ ] **Test from different locations** (if possible)
- [ ] **Announce deployment**: Inform stakeholders
- [ ] **Monitor for 24 hours**: Watch for any errors or issues
- [ ] **Schedule first backup**: Set up automated backups in cPanel

---

## Quick Command Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview

# Check build output
ls -la dist/

# View build size
du -sh dist/
```

## Emergency Contacts

- **Hosting Provider Support**: [Add phone/email]
- **Domain Registrar Support**: [Add phone/email]
- **Developer Contact**: [Add contact info]

---

**Last Updated**: [Date]  
**Checklist Version**: 1.0
