# 🚨 QUICK FIX - Render Deployment Error

## Problem
```
❌ MongoDB Error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

## Solution (5 Minutes)

### 1. Go to Render Dashboard
https://dashboard.render.com → Your Service → **Environment** tab

### 2. Add These Environment Variables

Click "Add Environment Variable" for each:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/adishri?retryWrites=true&w=majority
NODE_ENV = production
JWT_SECRET = your-secure-random-64-char-string
CLOUDINARY_CLOUD_NAME = your-cloudinary-name
CLOUDINARY_API_KEY = your-cloudinary-key
CLOUDINARY_API_SECRET = your-cloudinary-secret
FRONTEND_URL = https://your-frontend.onrender.com
```

### 3. Get MongoDB URI

**Don't have MongoDB Atlas?**

1. Go to https://cloud.mongodb.com
2. Sign up (free)
3. Create Free Cluster (M0)
4. Create Database User
5. Whitelist IP: 0.0.0.0/0
6. Get Connection String
7. Replace `<password>` with your actual password
8. Add `/adishri` before `?retryWrites`

**Example:**
```
mongodb+srv://myuser:MyPass123@cluster0.abc123.mongodb.net/adishri?retryWrites=true&w=majority
```

### 4. Generate JWT Secret

Run locally:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use as `JWT_SECRET`

### 5. Save & Redeploy

Click "Save Changes" in Render → Wait for redeploy

### 6. Check Logs

Should see:
```
✅ MongoDB Connected
🚀 Server running in production mode
```

---

## Still Not Working?

### Check MongoDB URI Format
```
mongodb+srv://USER:PASS@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

Make sure:
- ✅ No `<password>` placeholder
- ✅ Password is URL-encoded if it has special characters
- ✅ Database name is included (`/adishri`)
- ✅ IP whitelist includes 0.0.0.0/0 in MongoDB Atlas

### Test Locally First
```bash
cd backend
# Add MONGODB_URI to .env
npm run dev
# Should connect successfully
```

---

## Need MongoDB Atlas Help?

**Quick Setup:**
1. https://cloud.mongodb.com → Sign Up
2. "Build a Database" → M0 Free
3. "Database Access" → Add User → Save password
4. "Network Access" → Add IP → 0.0.0.0/0
5. "Database" → Connect → "Connect your application"
6. Copy connection string
7. Replace `<password>` with your password
8. Add to Render environment variables

---

## After Successful Deployment

### Seed Database (First Time)
In Render Shell:
```bash
node src/seeds/userSeeder.js
node src/seeds/coreValueSeeder.js
node src/seeds/standardSeeder.js
node src/seeds/navigationSeeder.js
```

### Test API
```bash
curl https://your-backend.onrender.com/api/health
```

Should return:
```json
{"success":true,"message":"API is running"}
```

---

**That's it! Your backend should now be deployed successfully.** 🎉
