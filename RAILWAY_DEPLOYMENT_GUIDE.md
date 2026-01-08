# Railway Deployment Guide

This guide will help you deploy the ReserveEase server to Railway.

## Prerequisites

- Railway account (sign up at [railway.app](https://railway.app))
- GitHub account (Railway integrates with GitHub)
- Your repository pushed to GitHub

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Add Railway configuration"
git push origin main
```

## Step 2: Connect Railway to GitHub

1. Go to [railway.app](https://railway.app)
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Authorize Railway to access your GitHub
5. Select your `smart-dine-webapp` repository

## Step 3: Configure Environment Variables

After Railway detects your project:

1. Railway will automatically detect `server/Procfile`
2. Click on the `server` service
3. Go to **Variables** tab
4. Add these environment variables:

```
PORT=5000
MONGO_URI=mongodb+srv://meetfarhan10g_db_user:farhan2003@cluster0.gbpokhl.mongodb.net/?appName=Cluster0/ReserveEase
JWT_SECRET=your_actual_random_secret_key_here_minimum_32_characters
NODE_ENV=production
```

**Important:**

- Replace `MONGO_URI` with your MongoDB Atlas connection string
- Generate a strong `JWT_SECRET` (use a random string generator)
- Set `NODE_ENV` to `production`

## Step 4: Database Configuration

If you want Railway to manage MongoDB (optional):

1. Go to **New** in your Railway project
2. Search for **MongoDB**
3. Add MongoDB as a service
4. Railway will automatically set `MONGO_URI` variable
5. You can then remove the manual MONGO_URI entry

## Step 5: Deploy

1. Click **Deploy** button
2. Railway will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build the application
   - Start the server with `node index.js`

3. Once deployment is complete, you'll see:
   - A public URL (e.g., `https://your-project.railway.app`)
   - Logs showing "Server running on port 5000"

## Step 6: Connect Frontend to Live Backend

Update your frontend API endpoint:

In your frontend code (e.g., in API calls), change:

```javascript
// Development
const API_URL = "http://localhost:5000";

// Production (Railway)
const API_URL = "https://your-project-name.railway.app";
```

Or set an environment variable:

```env
VITE_API_URL=https://your-project-name.railway.app
```

## Monitoring & Logs

- View real-time logs in Railway dashboard
- Check **Deployments** tab for deployment history
- Use **Metrics** tab to monitor CPU, memory, and requests

## Troubleshooting

### "Port is not available"

- Railway automatically assigns PORT via environment variable
- Your `index.js` correctly reads `process.env.PORT || 5000`
- No changes needed

### "MongoDB authentication failed"

- Verify MONGO_URI in Variables tab
- Check MongoDB Atlas IP whitelist includes Railway (add `0.0.0.0/0`)
- Test connection string locally first

### "Module not found" errors

- Check `package.json` has all dependencies
- Verify `server/package.json` exists and is valid
- Run `npm install` locally to test

### Build fails

- Check logs in Railway dashboard
- Ensure no syntax errors in `index.js`
- Verify all required files are committed to git

## Files Included

| File             | Purpose                             |
| ---------------- | ----------------------------------- |
| `Procfile`       | Tells Railway how to start your app |
| `railway.json`   | Railway-specific configuration      |
| `.railwayignore` | Files to exclude from deployment    |

## Cost

Railway has a generous free tier:

- **$5/month credit** for all services combined
- Node.js apps typically use $0-2/month
- MongoDB (if using Railway) adds minimal cost
- Exceed limits? Pay as you go

## Environment Variables Reference

| Variable     | Required | Example                              |
| ------------ | -------- | ------------------------------------ |
| `PORT`       | No\*     | `5000` (auto-set by Railway)         |
| `MONGO_URI`  | Yes      | `mongodb+srv://user:pass@cluster...` |
| `JWT_SECRET` | Yes      | `your_random_secret_key`             |
| `NODE_ENV`   | No       | `production`                         |

\*Railway sets this automatically

## Next Steps

After deployment:

1. Test API endpoints: `https://your-project.railway.app/api/users`
2. Deploy frontend to Vercel or Netlify
3. Update frontend API endpoint to Railway URL
4. Test end-to-end flow

## Support

- Railway docs: https://docs.railway.app
- Issues? Check Railway dashboard logs
- Community: https://discord.gg/railway
