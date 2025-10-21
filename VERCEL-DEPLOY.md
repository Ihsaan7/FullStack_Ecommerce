# ⚡ LuxeShop - Vercel Deployment (Step-by-Step)

## 🎯 Overview

This guide will deploy your **LuxeShop** e-commerce platform to Vercel with:

- **Backend API** on Vercel (Express + MongoDB)
- **Frontend** on Vercel (React + Vite)
- **Automatic CI/CD** on every git push
- **Zero secrets exposed** in repository

---

## 📋 Prerequisites

1. ✅ Vercel account: https://vercel.com/signup
2. ✅ GitHub repository: Already have it!
3. ✅ MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
4. ✅ MongoDB database: Ready
5. ✅ All code pushed to GitHub: ✓

---

## 🔑 Step 1: Generate Secure Secrets

### Generate JWT Secret

Run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Example output** (copy yours):

```
a3f5c2d8e9b1f4a6c7e2d9f1a3b5c7e9d0f2a4b5c7e8f9a1b2c3d4e5f6a7b8
```

Save this for later! ✅

---

## 🗄️ Step 2: MongoDB Atlas Setup

### 2.1 Ensure Database Ready

1. Go to: https://www.mongodb.com/cloud/atlas
2. Login to your account
3. Create/select your cluster
4. Create a database user (save credentials!)

### 2.2 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Drivers" → "Node.js"
3. Copy the connection string
4. Replace `<username>` and `<password>` with your user credentials

**Example**:

```
mongodb+srv://myuser:mypassword123@cluster0.abcde.mongodb.net/luxeshop?retryWrites=true&w=majority
```

### 2.3 Whitelist Vercel IPs

1. Go to **Security** → **Network Access**
2. Click **"Add IP Address"**
3. Add: `0.0.0.0/0` (allows all IPs - suitable for development)
   - ⚠️ For production: Whitelist specific Vercel IPs only
4. Click **"Confirm"**

✅ MongoDB ready!

---

## 🚀 Step 3: Deploy Backend to Vercel

### 3.1 Create Vercel Project

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Find: `FullStack_Ecommerce`
4. Click **"Import"**

### 3.2 Configure Backend

**Framework Preset**: Select "Other" (Node.js)

**Root Directory**:

- Click "Edit" next to root directory
- Change from `.` to `backend`
- Click "✓"

**Build Settings**:

- Build Command: `npm install` (leave as is)
- Output Directory: (leave empty)
- Install Command: `npm install` (leave as is)

### 3.3 Add Environment Variables

Click **"Environment Variables"**

Add these variables **individually**:

| Key                 | Value                                 | Environment |
| ------------------- | ------------------------------------- | ----------- |
| `MONGODB_URI`       | Your MongoDB connection string        | Production  |
| `JWT_SECRET`        | Your generated JWT secret             | Production  |
| `JWT_SECRET_EXPIRY` | `7d`                                  | Production  |
| `NODE_ENV`          | `production`                          | Production  |
| `FRONTEND_URL`      | `https://temp-placeholder.vercel.app` | Production  |

⚠️ You'll update `FRONTEND_URL` later after frontend deploys!

### 3.4 Deploy Backend

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. When done, you'll see: ✅ **Deployment Complete**

### 3.5 Copy Backend URL

Look for the deployed URL, like:

```
https://luxeshop-backend-abc123.vercel.app
```

**Save this URL!** You'll need it for the frontend. 📝

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Project

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Find: `FullStack_Ecommerce`
4. Click **"Import"**

⚠️ Make sure it's a **NEW** project, not the backend one!

### 4.2 Configure Frontend

**Framework Preset**: Select "Vite"

**Root Directory**: Keep as `.` (root)

**Build Settings**:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 4.3 Add Environment Variables

Click **"Environment Variables"**

Add this variable:

| Key            | Value                          | Environment |
| -------------- | ------------------------------ | ----------- |
| `VITE_API_URL` | Your backend URL from Step 3.5 | Production  |

**Example**: If backend URL is `https://luxeshop-backend-abc123.vercel.app`:

```
VITE_API_URL=https://luxeshop-backend-abc123.vercel.app
```

### 4.4 Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. When done, you'll see the deployed URL:

```
https://luxeshop-frontend-xyz789.vercel.app
```

**Save this URL!** 📝

---

## 🔄 Step 5: Update Backend with Frontend URL

Now you need to tell the backend where the frontend is deployed.

### 5.1 Go to Backend Project Settings

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Find your **backend project**
3. Click **"Settings"**

### 5.2 Update FRONTEND_URL

1. Go to **Environment Variables**
2. Find **`FRONTEND_URL`**
3. Click the edit icon (pencil)
4. Change value to your frontend URL:
   ```
   https://luxeshop-frontend-xyz789.vercel.app
   ```
5. Click **"Save"**

### 5.3 Redeploy Backend

1. Go to **"Deployments"** tab
2. Click the three dots on the latest deployment
3. Select **"Redeploy"**
4. Click **"Redeploy"** (confirm)
5. Wait for redeployment (~1-2 minutes)

✅ Now backend knows about frontend!

---

## ✅ Step 6: Verify Deployment

### 6.1 Test Backend API

Open this URL in your browser:

```
https://your-backend-url.vercel.app/api/products
```

**Expected Result**:

- JSON array with 20 products
- If you see this, ✅ backend works!

### 6.2 Test Frontend

1. Open: `https://your-frontend-url.vercel.app`
2. Check:
   - ✅ Page loads
   - ✅ Favicon (shopping bag) shows in tab
   - ✅ Title shows **"LuxeShop"**
   - ✅ Products display
   - ✅ Can filter by category
   - ✅ Can add to cart
   - ✅ Theme toggle works (light/dark)
   - ✅ Loader animation shows when navigating

### 6.3 Test Full Features

- ✅ Sign up/Login works
- ✅ Add products to cart
- ✅ View cart
- ✅ Search functionality
- ✅ Product details page
- ✅ Related products section
- ✅ Mobile responsive

If all tests pass: 🎉 **Deployment Successful!**

---

## 🐛 Troubleshooting

### Products Not Loading

**Problem**: See blank product list or errors

**Solution**:

1. Check `VITE_API_URL` in frontend environment variables
2. Verify backend URL is correct
3. Test backend directly: `your-backend-url/api/products`
4. Check browser console for errors (F12)
5. If still failing, redeploy both projects

### CORS Errors in Console

**Problem**: `Access-Control-Allow-Origin` errors

**Solution**:

1. Verify `FRONTEND_URL` in backend environment variables
2. Should match your frontend deployment URL exactly
3. Redeploy backend after updating
4. Wait 1-2 minutes for changes to propagate

### Cart Not Working

**Problem**: Can't add items or cart is empty

**Solution**:

1. Check MongoDB connection: `MONGODB_URI` must be valid
2. Verify database allows connections from 0.0.0.0/0
3. Check browser console for specific errors
4. Try signing up/login again
5. Redeploy backend

### Build Fails

**Problem**: Vercel build shows "Build failed"

**Solution**:

1. Check build logs in Vercel (red error messages)
2. Common issues:
   - Missing dependencies (check package.json)
   - Wrong root directory (should be `.` for frontend, `backend` for backend)
   - Incorrect environment variables
3. Fix locally, push to GitHub, Vercel auto-redeploys

---

## 📊 Monitoring Your Deployment

### Check Deployment Status

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click your project
3. View:
   - **Deployments** - All previous deployments
   - **Analytics** - Traffic and performance
   - **Function Logs** - Backend errors/logs
   - **Environment** - Current variables

### View Logs

**Backend Logs**:

1. Click backend project
2. Go to **"Deployments"**
3. Click the latest deployment
4. Click **"Runtime Logs"**

**Frontend Logs**:

1. Click frontend project
2. Go to **"Deployments"**
3. Click the latest deployment
4. Check **"Build Logs"** or **"Runtime Logs"**

---

## 🔄 Continuous Deployment

**Great news!** After this setup:

- Every time you **push to GitHub**:

  - ✅ Vercel automatically rebuilds your project
  - ✅ Deploy happens in ~1-2 minutes
  - ✅ No manual action needed!

- For **environment variable changes**:
  - Update in Vercel Project Settings
  - Click "Redeploy" on latest deployment
  - Changes take effect within minutes

---

## 🎓 What's Next?

### Before Going Live

- [ ] Test all features thoroughly
- [ ] Test on mobile devices
- [ ] Check performance (Vercel Analytics)
- [ ] Verify security (no console errors/warnings)
- [ ] Load test with multiple users
- [ ] Backup MongoDB database

### Launch & Share

1. Get your frontend URL from Vercel
2. Share: `https://your-luxeshop-url.vercel.app`
3. Monitor Vercel dashboard daily
4. Track user feedback

### Optional Upgrades

- **Custom Domain**: Add your own domain (luxeshop.com)
- **Pro Plan**: More bandwidth and features
- **Analytics**: Monitor user behavior
- **Staging**: Create staging deployment for testing

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **MongoDB Docs**: https://docs.mongodb.com/
- **This Repository Issues**: GitHub Issues tab

---

## ✨ Deployment Summary

| Component | Status       | URL                 |
| --------- | ------------ | ------------------- |
| Backend   | 🟢 Deployed  | `your-backend-url`  |
| Frontend  | 🟢 Deployed  | `your-frontend-url` |
| MongoDB   | 🟢 Connected | Atlas               |
| JWT Auth  | 🟢 Secured   | Configured          |
| Favicon   | 🟢 Active    | Shows in tab        |
| Theme     | 🟢 Working   | Light/Dark toggle   |
| Loader    | 🟢 Animated  | Shows on navigation |

---

**🚀 Your e-commerce platform is now live on Vercel!**

**Deployment Date**: October 21, 2025  
**Project**: LuxeShop v1.0.0  
**Status**: ✅ Production Ready

Enjoy your deployment! 🎉

---

## ⚠️ Important Security Reminders

1. **Never share your backend URL publicly** - It contains your API endpoints
2. **Never expose JWT_SECRET** - This is your master key
3. **Keep MongoDB password secure** - Don't share with unauthorized users
4. **Monitor costs** - Check Vercel & MongoDB usage regularly
5. **Backup data** - Regular MongoDB backups recommended
6. **Update dependencies** - Keep packages updated for security patches

---

**Made with ❤️ - LuxeShop E-Commerce Platform**
