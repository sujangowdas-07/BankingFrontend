# 🚀 Deployment Guide

## Production Build

### Build the Application
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Test Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deploy to Netlify

### Method 1: Deploy via Git (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Banking app"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure build settings:
     ```
     Build command: npm run build
     Publish directory: dist
     ```
   - Click "Deploy site"

3. **Environment Variables:**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_USE_MOCK_API=true
     VITE_API_BASE_URL=http://localhost:8080/api
     ```

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## ▲ Deploy to Vercel

### Method 1: Deploy via Git (Recommended)

1. **Push to GitHub** (same as above)

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com/)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     ```
     Framework Preset: Vite
     Build Command: npm run build
     Output Directory: dist
     ```
   - Add Environment Variables:
     ```
     VITE_USE_MOCK_API=true
     VITE_API_BASE_URL=http://localhost:8080/api
     ```
   - Click "Deploy"

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🔥 Deploy to Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project" or create new
   - Public directory: `dist`
   - Single-page app: `Yes`
   - GitHub integration: Optional

4. **Build and Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

---

## 📦 Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.js:**
   ```javascript
   export default {
     base: '/your-repo-name/',
     plugins: [react()]
   }
   ```

3. **Add deploy script to package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

---

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://your-backend-url:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Build and Run

```bash
# Build image
docker build -t banking-app .

# Run container
docker run -p 80:80 banking-app
```

---

## ☁️ Deploy to AWS S3 + CloudFront

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket:**
   - Go to AWS S3 Console
   - Create bucket with public access
   - Enable static website hosting

3. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Create CloudFront Distribution:**
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Error pages: Redirect 404 to `/index.html` (for SPA routing)

5. **Update DNS:**
   - Point your domain to CloudFront distribution

---

## 🔧 Environment Configuration for Production

### For Mock Mode (Demo)
```env
VITE_USE_MOCK_API=true
VITE_API_BASE_URL=http://localhost:8080/api
```

### For Production with Backend
```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-production-api.com/api
```

---

## 📊 Performance Optimization

### 1. Code Splitting
Already implemented via React.lazy in routes

### 2. Image Optimization
- Use WebP format
- Lazy load images
- Compress assets

### 3. Caching Strategy
```javascript
// In vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts']
        }
      }
    }
  }
}
```

### 4. Enable Gzip/Brotli
Most hosting platforms enable this automatically

---

## 🔒 Security Checklist for Production

- [ ] Update environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS properly on backend
- [ ] Set secure headers (CSP, HSTS, etc.)
- [ ] Remove console.logs
- [ ] Enable rate limiting on API
- [ ] Validate all inputs
- [ ] Implement proper session timeout
- [ ] Use secure tokens (JWT with expiry)
- [ ] Enable CSRF protection

---

## 📈 Monitoring & Analytics

### Add Google Analytics

1. **Create GA4 property**

2. **Add to index.html:**
```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
// In main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## 🧪 Testing Before Deployment

### Run these checks:

1. **Build succeeds:**
   ```bash
   npm run build
   ```

2. **No console errors:**
   - Open browser dev tools
   - Check console
   - Check network tab

3. **Test all features:**
   - [ ] Login/Logout
   - [ ] Dashboard loads
   - [ ] Deposit transaction
   - [ ] Withdrawal transaction
   - [ ] Transfer transaction
   - [ ] Transaction history
   - [ ] Filters work
   - [ ] CSV export
   - [ ] Profile edit
   - [ ] Password change
   - [ ] Mobile responsive

4. **Test on different browsers:**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

5. **Test on different devices:**
   - [ ] Desktop
   - [ ] Tablet
   - [ ] Mobile

---

## 🆘 Troubleshooting Deployment

### Issue: Routes not working after deployment
**Solution:** Configure your hosting for SPA routing
- Netlify: Add `_redirects` file with `/* /index.html 200`
- Vercel: Add `vercel.json` with rewrites
- Apache: Configure `.htaccess`
- Nginx: Configure `try_files`

### Issue: API calls failing
**Solution:** 
- Check CORS configuration on backend
- Verify API URL in environment variables
- Check network tab for actual errors

### Issue: Assets not loading
**Solution:**
- Verify `base` path in `vite.config.js`
- Check asset paths are relative
- Clear browser cache

### Issue: Build fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm cache clean --force
npm install
npm run build
```

---

## 📝 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] All features working
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics tracking
- [ ] Error monitoring setup
- [ ] Backup strategy in place
- [ ] Documentation updated

---

## 🎉 Success!

Your banking application is now deployed and accessible to users!

**Next Steps:**
1. Share the URL with your team/instructor
2. Monitor for any issues
3. Collect feedback
4. Plan for updates

---

**Need Help?** Check the main README.md or QUICKSTART.md for more information.
