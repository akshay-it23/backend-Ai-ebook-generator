# 🚀 Deployment Guide

This guide will walk you through deploying the AI E-Book Creator application to production.

## 📋 Overview

- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Render or Railway
- **Database**: MongoDB Atlas

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (Free tier is sufficient)

### 1.2 Configure Database

1. Click "Connect" on your cluster
2. Add your IP address to the whitelist (or use `0.0.0.0/0` for all IPs)
3. Create a database user with username and password
4. Get your connection string (should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ai-ebook?retryWrites=true&w=majority
   ```

## 🖥️ Step 2: Backend Deployment (Render)

### 2.1 Prepare Backend

1. Ensure your `backend/package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```

### 2.2 Deploy to Render

1. Go to [Render](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: ai-ebook-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 2.3 Set Environment Variables

Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=5000
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-a-random-secure-string>
GEMINI_API_KEY=<your-gemini-api-key>
OPENROUTER_API_KEY=<your-openrouter-api-key>
OPENROUTER_MODEL=openai/gpt-3.5-turbo
CORS_ORIGIN=<your-frontend-url>
```

**Important Notes:**
- Replace `<your-mongodb-atlas-connection-string>` with your actual MongoDB Atlas URI
- Generate a strong random string for `JWT_SECRET` (e.g., using `openssl rand -base64 32`)
- `CORS_ORIGIN` will be your Vercel URL (add it after frontend deployment)

### 2.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL (e.g., `https://ai-ebook-backend.onrender.com`)

## 🌐 Step 3: Frontend Deployment (Vercel)

### 3.1 Prepare Frontend

1. Create `.env.production` in frontend folder:
   ```
   VITE_API_URL=<your-render-backend-url>
   ```

### 3.2 Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Set Environment Variables

Add in Vercel dashboard:
```
VITE_API_URL=<your-render-backend-url>
```

### 3.4 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Note your frontend URL (e.g., `https://your-app.vercel.app`)

## 🔄 Step 4: Update CORS Origin

1. Go back to Render dashboard
2. Update `CORS_ORIGIN` environment variable with your Vercel URL
3. Redeploy the backend service

## ✅ Step 5: Verification

### 5.1 Test Backend

Visit: `https://your-backend-url.onrender.com/health`

You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-01-30T..."
}
```

### 5.2 Test Frontend

1. Visit your Vercel URL
2. Try signing up for a new account
3. Create a book
4. Test AI generation
5. Test export functionality

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Server not starting
- Check Render logs for errors
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas IP whitelist includes Render's IPs

**Problem**: Database connection failed
- Verify MongoDB Atlas connection string
- Check database user credentials
- Ensure network access is configured correctly

### Frontend Issues

**Problem**: API calls failing
- Check `VITE_API_URL` is set correctly
- Verify CORS is configured properly on backend
- Check browser console for errors

**Problem**: 404 on page refresh
- Ensure `vercel.json` is present in frontend folder
- Verify rewrites configuration

### CORS Issues

**Problem**: CORS errors in browser
- Update `CORS_ORIGIN` in backend to match frontend URL
- Redeploy backend after changing environment variables

## 🔒 Security Checklist

- [ ] Changed `JWT_SECRET` to a strong random value
- [ ] Removed API keys from `.env` files
- [ ] Added `.env` to `.gitignore`
- [ ] Set up MongoDB Atlas IP whitelist
- [ ] Configured CORS properly
- [ ] Used HTTPS for all connections

## 📊 Monitoring

### Render
- Check logs in Render dashboard
- Monitor resource usage
- Set up alerts for downtime

### Vercel
- Check deployment logs
- Monitor analytics
- Review function logs

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Render**: Automatically deploys on git push to main branch
2. **Vercel**: Automatically deploys on git push to main branch

## 💰 Cost Considerations

### Free Tier Limits

**Render Free Tier:**
- 750 hours/month
- Spins down after 15 minutes of inactivity
- 512 MB RAM

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless functions

**MongoDB Atlas Free Tier:**
- 512 MB storage
- Shared RAM
- No backup

### Upgrading

For production use with higher traffic, consider:
- Render: $7/month for always-on instance
- Vercel: $20/month for Pro plan
- MongoDB Atlas: $9/month for M2 cluster

## 📝 Post-Deployment Tasks

1. Update README with live demo URL
2. Test all features in production
3. Set up monitoring and alerts
4. Configure custom domain (optional)
5. Set up SSL certificates (automatic on Vercel/Render)

## 🎉 You're Done!

Your AI E-Book Creator is now live! Share your app with users and start creating amazing e-books.

---

Need help? Check the main README or open an issue on GitHub.
