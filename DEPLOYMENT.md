# Deployment Guide

This guide covers deploying the Doctor Portfolio Website to various platforms.

## Pre-Deployment Checklist

- [ ] Run `npm run build` and verify no errors
- [ ] Run `npm run test` and ensure all tests pass
- [ ] Run `npm run lint` and fix any issues
- [ ] Update doctor profile in `src/data/sampleData.ts`
- [ ] Test on mobile, tablet, and desktop
- [ ] Run Lighthouse audit and verify score ≥ 90
- [ ] Test accessibility with screen reader
- [ ] Verify all links and forms work correctly

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest option for deploying Vite applications.

#### Option A: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts to connect your GitHub account and deploy.

#### Option B: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

Vercel will automatically deploy on every push to main.

### 2. Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect via GitHub:
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Click "Deploy site"

### 3. GitHub Pages

1. Update `vite.config.ts` to set the base path:
```typescript
export default defineConfig({
  base: '/doctor-portfolio/', // Replace with your repo name
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git push origin main
```

3. Go to repository Settings > Pages
4. Set source to "Deploy from a branch"
5. Select "main" branch and "/root" folder

### 4. AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket and upload:
```bash
aws s3 sync dist/ s3://your-bucket-name/
```

3. Create CloudFront distribution pointing to S3 bucket

4. Update DNS to point to CloudFront distribution

### 5. Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t doctor-portfolio .
docker run -p 3000:3000 doctor-portfolio
```

## Environment Variables

Create a `.env.production` file for production-specific variables:

```env
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=your-sentry-dsn
```

## Performance Optimization

### Before Deployment

1. **Optimize Images**:
   - Convert to WebP format
   - Compress with TinyPNG or similar
   - Use appropriate sizes for different breakpoints

2. **Code Splitting**:
   - Already configured in `vite.config.ts`
   - Verify separate chunks for Three.js, Framer Motion, React Spring

3. **CSS Optimization**:
   - Tailwind CSS automatically purges unused styles
   - Verify CSS file size < 50KB

4. **JavaScript Optimization**:
   - Tree-shaking enabled by default
   - Verify bundle size < 200KB (gzipped)

### Monitoring Performance

1. **Lighthouse Audit**:
   - Run in Chrome DevTools
   - Target score: ≥ 90
   - Check Core Web Vitals

2. **Bundle Analysis**:
```bash
npm install -g vite-plugin-visualizer
# Add to vite.config.ts and run build
```

3. **Real User Monitoring**:
   - Set up Sentry for error tracking
   - Monitor Core Web Vitals with Web Vitals library

## SSL/HTTPS

All deployment platforms provide free SSL certificates:
- **Vercel**: Automatic
- **Netlify**: Automatic
- **GitHub Pages**: Automatic
- **AWS**: Use AWS Certificate Manager
- **Docker**: Use Let's Encrypt with Nginx reverse proxy

## Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Update DNS records

### GitHub Pages
1. Go to Settings > Pages
2. Set custom domain
3. Update DNS records

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - run: npm run lint
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## Monitoring and Maintenance

### Error Tracking

Set up Sentry:

1. Create account at [sentry.io](https://sentry.io)
2. Create new project for React
3. Add DSN to environment variables
4. Install Sentry SDK:
```bash
npm install @sentry/react @sentry/tracing
```

### Analytics

Add Google Analytics:

```typescript
// In App.tsx
import { useEffect } from 'react'

useEffect(() => {
  // Add Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID'
  document.head.appendChild(script)
}, [])
```

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [StatusPage](https://www.statuspage.io)

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Click on previous deployment
3. Click "Promote to Production"

### Netlify
1. Go to Deploys
2. Click on previous deploy
3. Click "Publish deploy"

### GitHub Pages
1. Revert commit: `git revert <commit-hash>`
2. Push to main
3. GitHub Pages automatically redeploys

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set security headers (CSP, X-Frame-Options, etc.)
- [ ] Enable CORS if needed
- [ ] Validate all form inputs
- [ ] Sanitize user data
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting on API endpoints
- [ ] Regular security audits

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Performance Issues
1. Check bundle size: `npm run build` and check dist/ size
2. Run Lighthouse audit
3. Check for large dependencies
4. Enable gzip compression on server

### Deployment Fails
1. Check build logs
2. Verify environment variables
3. Check Node.js version compatibility
4. Verify all dependencies are installed

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review build logs
3. Test locally with `npm run preview`
4. Check GitHub Issues for similar problems

---

**Happy deploying! 🚀**
