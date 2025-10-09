# Environment Variables Setup Script for Vercel
# Run these commands one by one to add environment variables

# MongoDB Connection String
vercel env add MONGODB_URI production

# JWT Secret Key (use a strong random string)
vercel env add JWT_SECRET production

# JWT Expiry
vercel env add JWT_SECRET_EXPIRY production

# Node Environment
vercel env add NODE_ENV production

# Frontend URL (will be: https://react-mini-ecommerce-rose.vercel.app)
vercel env add FRONTEND_URL production

# After adding all variables, deploy to production:
# vercel --prod
