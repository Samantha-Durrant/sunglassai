# 🚀 GitHub Pages Deployment Guide

## 📋 Complete Deployment Steps for SunglassAI

### 🏗️ Current Setup
- **Repository**: `https://github.com/Samantha-Durrant/sunglassai.git`
- **Live Site**: `https://samantha-durrant.github.io/sunglassai/`
- **Deployment Method**: GitHub Pages with `docs/` folder
- **Build System**: Vite + TypeScript + React

---

## 🔄 Standard Deployment Process

### Method 1: Quick Deploy (Recommended)
```bash
# 1. Make your changes and test locally
npm run dev

# 2. Build for production and deploy in one command
npm run build:gh-pages
```

### Method 2: Step-by-Step Deploy
```bash
# 1. Build the project
npm run build

# 2. Stage all changes
git add .

# 3. Commit changes
git commit -m "Deploy: Update with latest features"

# 4. Push to GitHub
git push origin main
```

---

## 📂 Project Structure for Deployment

```
sunglasses app/
├── src/                  # React source code
├── docs/                # 🚀 GitHub Pages deployment folder
│   ├── index.html       # Built HTML file
│   ├── assets/          # CSS, JS, images
│   └── ...              # Other build artifacts
├── .env                 # Environment variables (NOT deployed)
├── package.json         # Project configuration
├── vite.config.ts       # Build configuration
└── README.md           # Project documentation
```

---

## ⚙️ Build Configuration Details

### Vite Config (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sunglassai/',  // GitHub Pages subdirectory
  build: {
    outDir: 'docs',      // Build to docs/ for GitHub Pages
  }
})
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:gh-pages": "npm run build && git add docs && git commit -m 'Update GitHub Pages build' && git push origin main"
  }
}
```

---

## 🔧 GitHub Repository Settings

### 1. Enable GitHub Pages
1. Go to your repository: `https://github.com/Samantha-Durrant/sunglassai`
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select: **Deploy from a branch**
5. Choose **Branch**: `main`
6. Choose **Folder**: `/docs`
7. Click **Save**

### 2. Verify Settings
- **Source**: Deploy from a branch
- **Branch**: main / docs
- **Custom domain**: (none)
- **Enforce HTTPS**: ✅ Enabled

---

## 🚀 Complete Deployment Workflow

### For New Features/Changes:

```bash
# 1. Start development server
npm run dev

# 2. Make your changes to src/ files
# 3. Test thoroughly in browser

# 4. When ready to deploy:
npm run build:gh-pages

# 5. Wait 2-3 minutes, then check:
# https://samantha-durrant.github.io/sunglassai/
```

### For Hotfixes:

```bash
# 1. Make quick fix
# 2. Build and deploy immediately
npm run build
git add . && git commit -m "Hotfix: [description]" && git push
```

---

## 📊 Deployment Checklist

### Before Deploying:
- [ ] Test locally with `npm run dev`
- [ ] Check all features work correctly
- [ ] Verify brand data loads properly
- [ ] Test email functionality (copy to clipboard)
- [ ] Check responsive design on mobile

### After Deploying:
- [ ] Wait 2-3 minutes for GitHub Pages update
- [ ] Visit live site: `https://samantha-durrant.github.io/sunglassai/`
- [ ] Test all functionality on live site
- [ ] Check browser console for errors
- [ ] Verify brand preview modals work

---

## 🛠️ Build Troubleshooting

### Common Issues:

#### 1. Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist docs
npm install
npm run build
```

#### 2. GitHub Pages Not Updating
```bash
# Force push to trigger rebuild
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push origin main
```

#### 3. Assets Not Loading
- Check `vite.config.ts` has correct `base: '/sunglassai/'`
- Verify `package.json` homepage matches repository name

---

## 🔐 Environment Variables

### ⚠️ Important Security Notes:
- **`.env` file is NOT deployed** to GitHub Pages
- **SendGrid API keys** remain secure on your local machine
- **Live site uses clipboard fallback** for email functionality

### For Email Functionality:
```bash
# Local development (with SendGrid)
VITE_SENDGRID_API_KEY=SG.your_api_key_here

# Live site automatically falls back to clipboard copy
# No API key needed for live deployment
```

---

## 📈 Deployment History

### Recent Deployments:
- **Latest**: SendGrid integration + 200+ real brands
- **Previous**: Brand preview modal functionality
- **Previous**: Smart Discovery with export features

### View Deployment Status:
1. Go to **Actions** tab in GitHub repository
2. See build/deploy history and status
3. Check for any failed deployments

---

## 🎯 Quick Reference Commands

```bash
# Development
npm run dev                    # Start local server

# Building
npm run build                  # Build only
npm run build:gh-pages        # Build + deploy

# Git operations
git add .                      # Stage all changes
git commit -m "message"        # Commit changes
git push origin main           # Push to GitHub

# Emergency commands
git status                     # Check current status
git log --oneline -5          # Recent commits
git remote -v                 # Check remote URLs
```

---

## 🌐 Live Site Information

- **URL**: https://samantha-durrant.github.io/sunglassai/
- **Update Time**: 2-3 minutes after push
- **Features**: Brand discovery, preview modals, CSV export, email templates
- **Data**: 200+ real sunglasses brands with contact information

---

## 📞 Support

If deployment fails:
1. Check GitHub Actions for build errors
2. Verify all files are committed and pushed
3. Check GitHub Pages settings in repository
4. Wait 5-10 minutes for propagation
5. Clear browser cache and try again

Your deployment system is ready for seamless updates! 🚀
