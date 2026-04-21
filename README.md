# 🦁 Jimfire Safaris & Transfers

A modern, responsive website for Jimfire Safaris & Transfers - Kenya's premier safari tour operator. Built with React, TypeScript, and Tailwind CSS, optimized for cPanel deployment.

## 🌟 Features

- **🎨 Beautiful Design**: Elegant, professional interface with custom blue theme
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **🎯 Tour Packages**: Showcase safari tours with images, descriptions, and pricing
- **🚗 Fleet Management**: Display diverse vehicle options (8 types)
- **⭐ Testimonials**: Customer reviews and social proof
- **📧 Contact Form**: Easy inquiry submission with tour pre-selection
- **🔐 Admin Dashboard**: Manage tours, vehicles, testimonials, and site content
- **🖼️ Image Upload**: Custom logo and tour package images with auto-resizing
- **💾 Data Persistence**: All changes saved in browser storage

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5000
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to cPanel

### Quick Deploy (3 Steps)

1. **Build the application**
   ```bash
   ./prepare-deployment.sh   # Mac/Linux
   # OR
   prepare-deployment.bat    # Windows
   ```

2. **Upload to cPanel**
   - Login to cPanel
   - Open File Manager → public_html
   - Upload everything from `dist/` folder

3. **Verify**
   - Visit your website
   - Test all features

### Detailed Documentation

- 📖 **[DEPLOY_README.md](./DEPLOY_README.md)** - Quick deployment guide
- 📋 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment instructions
- ✅ **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist
- ⚡ **[PERFORMANCE.md](./PERFORMANCE.md)** - Performance optimization guide

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Phosphor Icons
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Notifications**: Sonner

## 📁 Project Structure

```
jimfire-safaris/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn UI components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TourCard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ...
│   ├── lib/              # Utilities and types
│   ├── hooks/            # Custom React hooks
│   ├── assets/           # Images and media
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles
├── public/               # Static assets
├── dist/                 # Production build (generated)
├── .htaccess            # Apache configuration
└── deployment docs/      # Deployment guides
```

## 🎨 Customization

### Update Company Information

Edit in respective components:
- **Phone**: +254 724 00 22 99
- **Email**: info@jimfiresafarisandtransfers.com
- **Company Name**: Jimfire Safaris

### Change Theme Colors

Edit `src/index.css`:
```css
:root {
  --primary: oklch(0.45 0.12 250);    /* Main blue */
  --secondary: oklch(0.38 0.08 260);  /* Dark blue */
  --accent: oklch(0.65 0.15 240);     /* Light blue */
}
```

### Admin Access

1. Click "Admin" link in navigation
2. Login with credentials (stored locally)
3. Manage:
   - Tour packages
   - Vehicle fleet
   - Testimonials
   - Company logo
   - Images

## 🔒 Security Features

- ✅ HTTPS enforcement (via .htaccess)
- ✅ Security headers configured
- ✅ Directory browsing disabled
- ✅ XSS protection
- ✅ CSRF prevention
- ✅ Input validation with Zod

## 🎯 Performance Optimizations

- ✅ Code splitting (automatic)
- ✅ Tree shaking
- ✅ Minification
- ✅ GZIP compression
- ✅ Browser caching
- ✅ Lazy loading
- ✅ Image optimization
- ✅ Font optimization

**Expected Performance:**
- Load time: 1-3 seconds
- PageSpeed score: 80-95
- Mobile-friendly

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🐛 Troubleshooting

### Common Issues

**White screen after deployment:**
- Check browser console for errors
- Verify all files uploaded correctly
- Check file permissions (644/755)

**404 on page refresh:**
- Ensure `.htaccess` is uploaded
- Verify mod_rewrite is enabled

**Images not loading:**
- Upload entire `assets` folder
- Clear browser cache
- Check file paths (case-sensitive)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting.

## 📊 Analytics & Monitoring

Optional integrations:
- Google Analytics
- Google Search Console
- Cloudflare Analytics
- cPanel Metrics

## 🔄 Updates & Maintenance

### To Update the Site:

1. Make changes locally
2. Test with `npm run dev`
3. Build with `npm run build`
4. Upload `dist/*` to server
5. Clear browser cache
6. Verify changes

### Regular Maintenance:

- Monthly: Check performance, review logs
- Quarterly: Update content, optimize images
- Yearly: Review hosting, audit performance

## 📞 Support

- **Hosting Issues**: Contact your cPanel provider
- **Technical Issues**: Check documentation files
- **Development**: Review code comments

## 📄 Documentation Files

- `README.md` - This file (project overview)
- `PRD.md` - Product requirements document
- `DEPLOY_README.md` - Quick deployment guide
- `DEPLOYMENT.md` - Complete deployment instructions
- `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist
- `PERFORMANCE.md` - Performance optimization guide

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [cPanel Documentation](https://docs.cpanel.net/)

## 📝 License

This project is built with Spark Template resources from GitHub, licensed under the MIT license, Copyright GitHub, Inc.

## 🌍 Live Site

After deployment, your site will be live at:
- `https://yourdomain.com`

---

**Built with ❤️ for Jimfire Safaris & Transfers**

Ready to deploy? Check out [DEPLOY_README.md](./DEPLOY_README.md) to get started! 🚀
