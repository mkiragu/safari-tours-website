# 🚀 Quick Deployment Guide

Deploy your Jimfire Safaris website to cPanel in 3 simple steps!

## Prerequisites

- ✅ cPanel hosting account
- ✅ Node.js installed locally (v18 or higher)
- ✅ Project files on your local machine

## Quick Start (3 Steps)

### Step 1: Prepare Build

**On Mac/Linux:**
```bash
chmod +x prepare-deployment.sh
./prepare-deployment.sh
```

**On Windows:**
```bash
prepare-deployment.bat
```

**Or manually:**
```bash
npm run build
cp .htaccess dist/
```

This creates a `dist/` folder with all files ready for deployment.

### Step 2: Upload to cPanel

1. **Login to cPanel** (yourdomain.com/cpanel)
2. **Open File Manager** → Navigate to `public_html`
3. **Upload everything from `dist/` folder**:
   - index.html
   - assets/ (entire folder)
   - .htaccess

**Alternative: Use FTP**
- Connect with FileZilla or similar
- Upload `dist/*` to `public_html/`

### Step 3: Verify

Visit your website: `https://yourdomain.com`

✅ Check homepage loads  
✅ Test navigation  
✅ Try admin login  
✅ Test contact form  

**Done! 🎉**

---

## Need More Details?

📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide  
✅ **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist  

## Troubleshooting

### White Screen / Blank Page
- Check browser console (F12) for errors
- Verify all files uploaded correctly
- Check file permissions: files=644, folders=755

### 404 Error on Page Refresh
- Ensure `.htaccess` is uploaded and in the correct location
- Verify mod_rewrite is enabled in cPanel

### Images Not Loading
- Verify `assets` folder uploaded completely
- Check file paths (case-sensitive on Linux)
- Clear browser cache (Ctrl+F5)

### Admin Login Not Working
- Check browser console for errors
- Ensure JavaScript is enabled
- Try different browser

## File Structure

After upload, your `public_html` should look like:

```
public_html/
├── .htaccess          # URL rewriting & security
├── index.html         # Main HTML file
└── assets/            # All resources
    ├── index-[hash].js
    ├── index-[hash].css
    └── [images]
```

## Important Notes

⚠️ **Data Storage**: Admin data (tours, testimonials) is stored in browser localStorage. Each admin's changes are saved locally.

🔒 **HTTPS**: Strongly recommended. Enable in cPanel → SSL/TLS Status.

💾 **Backups**: Always backup before updating. Use cPanel Backup Wizard.

## Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build           # Create production build
npm run preview         # Test build locally

# Deployment
./prepare-deployment.sh # Build + prepare (Mac/Linux)
prepare-deployment.bat  # Build + prepare (Windows)
```

## Support

- 📧 Contact hosting provider for server issues
- 📁 Check DEPLOYMENT.md for detailed instructions
- 🐛 Test locally first with `npm run preview`

## Version

**Application**: Jimfire Safaris & Transfers  
**Framework**: React + Vite  
**Deployment Target**: cPanel Static Hosting  

---

**Ready to deploy?** Run the preparation script and follow Step 2 above! 🚀
