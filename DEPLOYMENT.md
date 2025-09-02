# Mantis UI Deployment Guide

## Quick Deployment Commands

### Component Library
```bash
# Build and publish to NPM
cd mantis-ui
npm run build
npm publish

# Or for local testing
npm link
```

### Showcase Webapp
```bash
# Deploy to Vercel (fastest)
cd webapp
npm run build
npx vercel --prod

# Or deploy to Netlify
npm run build
npx netlify deploy --prod --dir=dist
```

## Detailed Deployment Workflows

### 1. Component Library to NPM Registry

#### First-time Setup:
```bash
cd mantis-ui

# Ensure you're logged into NPM
npm whoami
# If not logged in: npm login

# Verify package.json settings
cat package.json | grep -E "(name|version|main|types)"
```

#### Publishing Process:
```bash
# 1. Update version
npm version patch  # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor  # 1.0.0 -> 1.1.0 (new features)
npm version major  # 1.0.0 -> 2.0.0 (breaking changes)

# 2. Build the library
npm run build

# 3. Test the build locally (optional)
npm pack  # Creates a .tgz file for testing

# 4. Publish
npm publish

# 5. Verify publication
npm view mantis-ui
```

### 2. Showcase Webapp to Vercel

#### First-time Setup:
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login
```

#### Deployment Process:
```bash
cd webapp

# Build locally to check for errors
npm run build

# Deploy to preview (optional)
vercel

# Deploy to production
vercel --prod

# Custom domain (if needed)
vercel domains add yourdomain.com
vercel alias set your-deployment-url.vercel.app yourdomain.com
```

### 3. Automated CI/CD with GitHub Actions

Create `.github/workflows/deploy-library.yml`:
```yaml
name: Publish Library

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: |
          cd mantis-ui
          npm ci
      
      - name: Build
        run: |
          cd mantis-ui
          npm run build
      
      - name: Publish to NPM
        run: |
          cd mantis-ui
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Create `.github/workflows/deploy-webapp.yml`:
```yaml
name: Deploy Webapp

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and build
        run: |
          cd webapp
          npm ci
          npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: webapp
```

### 4. Docker Deployment for Webapp

#### Single-stage Dockerfile:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY webapp/package*.json ./
RUN npm ci

COPY webapp/ .
RUN npm run build

# Serve with a simple HTTP server
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### Multi-stage Dockerfile (recommended):
```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY webapp/package*.json ./
RUN npm ci --only=production

COPY webapp/ .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Configure nginx for SPA
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Build and deploy:
```bash
# Build Docker image
docker build -t mantis-showcase .

# Run locally
docker run -p 8080:80 mantis-showcase

# Deploy to production (example with AWS ECR)
docker tag mantis-showcase:latest your-account.dkr.ecr.region.amazonaws.com/mantis-showcase:latest
docker push your-account.dkr.ecr.region.amazonaws.com/mantis-showcase:latest
```

### 5. Server Deployment (Ubuntu/CentOS)

#### Setup Server:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install nginx
sudo apt install nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

#### Deploy Webapp:
```bash
# Clone repository
git clone https://github.com/your-org/mantis.git
cd mantis/webapp

# Install dependencies and build
npm ci
npm run build

# Serve with PM2 (using serve)
npm install -g serve
pm2 start "serve -s dist -l 3000" --name mantis-showcase

# Configure nginx
sudo tee /etc/nginx/sites-available/mantis-showcase <<EOF
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/mantis-showcase /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Set up SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment-Specific Configurations

### Development
```bash
# .env.development
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=Mantis UI - Development
VITE_DEBUG=true
```

### Staging
```bash
# .env.staging
VITE_API_URL=https://api-staging.yourdomain.com
VITE_APP_TITLE=Mantis UI - Staging
VITE_DEBUG=true
```

### Production
```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_APP_TITLE=Mantis UI
VITE_DEBUG=false
VITE_ANALYTICS_ID=your-analytics-id
```

## Release Management

### Semantic Versioning
- **Major**: Breaking changes (1.0.0 → 2.0.0)
- **Minor**: New features, backward compatible (1.0.0 → 1.1.0)
- **Patch**: Bug fixes (1.0.0 → 1.0.1)

### Release Process
```bash
# 1. Create release branch
git checkout -b release/v1.1.0

# 2. Update version
cd mantis-ui
npm version minor

# 3. Update CHANGELOG.md
echo "## [1.1.0] - $(date +%Y-%m-%d)" >> CHANGELOG.md
echo "### Added" >> CHANGELOG.md
echo "- New feature descriptions" >> CHANGELOG.md

# 4. Commit and push
git add .
git commit -m "Release v1.1.0"
git push origin release/v1.1.0

# 5. Create PR and merge to main

# 6. Tag release
git tag v1.1.0
git push origin v1.1.0

# 7. Publish (if automated CI/CD is not set up)
cd mantis-ui
npm publish
```

## Monitoring and Maintenance

### Health Checks
```bash
# Check if webapp is running
curl -f http://your-domain.com/health || exit 1

# Check NPM package
npm view mantis-ui time --json
```

### Log Monitoring
```bash
# PM2 logs
pm2 logs mantis-showcase

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Performance Monitoring
```bash
# Build size analysis
cd webapp
npm run build
npx vite-bundle-analyzer dist

# Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-domain.com --output html --output-path ./lighthouse-report.html
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for dependency conflicts
npm ls
```

#### Deployment Failures
```bash
# Vercel deployment fails
vercel logs
vercel env ls

# Docker build fails
docker build --no-cache .
docker logs container-name
```

#### Runtime Issues
```bash
# Check service status
pm2 status
systemctl status nginx

# Restart services
pm2 restart mantis-showcase
sudo systemctl restart nginx
```

## Security Best Practices

1. **Keep dependencies updated**:
   ```bash
   npm audit
   npm update
   ```

2. **Use environment variables for secrets**:
   ```bash
   # Never commit API keys or secrets
   echo "VITE_API_KEY=your-secret" >> .env.local
   ```

3. **Set up HTTPS**:
   ```bash
   # Always use HTTPS in production
   sudo certbot --nginx -d your-domain.com
   ```

4. **Configure security headers**:
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-Content-Type-Options "nosniff" always;
   add_header X-XSS-Protection "1; mode=block" always;
   ```

## Support and Maintenance

- **Regular updates**: Update dependencies monthly
- **Security patches**: Apply immediately when available
- **Performance monitoring**: Monitor bundle size and loading times
- **User feedback**: Monitor analytics and user reports
- **Backup**: Regularly backup configuration and data

For issues or questions, contact the development team or create an issue in the repository.
