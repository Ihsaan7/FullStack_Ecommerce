# 🚀 Vercel Deployment Guide

This guide will help you deploy your full-stack e-commerce application to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **MongoDB Atlas**: Production database ready

## 🔧 Step 1: Prepare Environment Variables

You'll need to set these in Vercel:

### Backend Variables
```
MONGODB_URI=your_production_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret
JWT_SECRET_EXPIRY=7d
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend Variables (Optional)
```
VITE_API_URL=/api
```

## 🌐 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com/new](https://vercel.com/new)**

2. **Import your GitHub repository**
   - Click "Import Git Repository"
   - Select: `Ihsaan7/FullStack_Ecommerce-react-express-`

3. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: `./` (keep as is)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add all variables listed in Step 1
   - Make sure to add them for "Production" environment

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - Project name: [press enter for default]
# - Directory: ./ [press enter]
# - Override settings: N

# Deploy to production
vercel --prod
```

## 🔐 Step 3: Add Environment Variables (CLI Method)

```bash
# Add each environment variable
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add JWT_SECRET_EXPIRY
vercel env add NODE_ENV
vercel env add FRONTEND_URL

# When prompted, select "Production" and paste the value
```

## 🔄 Step 4: Update CORS Settings

After first deployment, you'll get a URL like: `https://your-app-name.vercel.app`

1. **Update FRONTEND_URL in Vercel**
   - Go to Project Settings → Environment Variables
   - Update `FRONTEND_URL` with your actual Vercel URL

2. **Update backend/index.js** (already done)
   - The CORS configuration automatically uses `FRONTEND_URL`

3. **Redeploy** if needed
   ```bash
   vercel --prod
   ```

## ✅ Step 5: Verify Deployment

1. **Check API Health**
   - Visit: `https://your-app.vercel.app/api`
   - Should see: `{"message": "E-Commerce API is running!", "status": "healthy"}`

2. **Test Authentication**
   - Visit your app
   - Try signing up/logging in
   - Check if cart functionality works

## 🐛 Troubleshooting

### Issue: CORS Errors
**Solution**: Make sure `FRONTEND_URL` environment variable is set correctly in Vercel

### Issue: Database Connection Failed
**Solution**: 
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify `MONGODB_URI` is correct in Vercel environment variables

### Issue: JWT Errors
**Solution**: Ensure `JWT_SECRET` is set in Vercel environment variables

### Issue: Routes Not Working
**Solution**: 
- Check `vercel.json` is committed to git
- Ensure all API routes are prefixed with `/api`

## 📊 Monitoring

- **View Logs**: Dashboard → Your Project → Deployments → Click deployment → Runtime Logs
- **View Analytics**: Dashboard → Your Project → Analytics

## 🔄 Continuous Deployment

Once set up, Vercel automatically deploys:
- **Production**: When you push to `main` or `master` branch
- **Preview**: For every pull request and branch push

## 🎯 Post-Deployment Checklist

- [ ] API health check returns success
- [ ] User signup works
- [ ] User login works
- [ ] Products display correctly
- [ ] Add to cart works
- [ ] Cart persistence works
- [ ] Logout works
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Update README with live URLs

## 🌟 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `FRONTEND_URL` environment variable

## 📝 Notes

- **First deployment** may take 3-5 minutes
- **Subsequent deployments** are faster (1-2 minutes)
- **Environment variables** changes require redeployment
- **Free tier** includes:
  - 100 GB bandwidth/month
  - Serverless function execution
  - Automatic HTTPS
  - Global CDN

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- Check project Issues on GitHub

---

**Happy Deploying! 🚀**
