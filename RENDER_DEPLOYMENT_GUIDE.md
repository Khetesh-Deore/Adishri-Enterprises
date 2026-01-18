# 🚀 Render Deployment Guide - Adishri Enterprises Backend

## ❌ Current Issue

**Error:** `MongoDB Error: The 'uri' parameter to 'openUri()' must be a string, got "undefined"`

**Cause:** Environment variables are not configured in Render dashboard.

---

## ✅ Solution: Configure Environment Variables

### Step 1: Access Render Dashboard

1. Go to https://dashboard.render.com
2. Click on your backend service (adishri-backend)
3. Click on **"Environment"** tab in the left sidebar

### Step 2: Add Required Environment Variables

Click **"Add Environment Variable"** and add each of these:

#### Required Variables

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Sets production mode |
| `PORT` | `5000` | Server port (Render auto-assigns, but good to set) |
| `MONGODB_URI` | `your-mongodb-atlas-uri` | **CRITICAL - See below** |
| `JWT_SECRET` | `your-secure-jwt-secret-key-change-this` | **CRITICAL - Use strong secret** |
| `JWT_EXPIRES_IN` | `7d` | Token expiration |
| `CLOUDINARY_CLOUD_NAME` | `your-cloudinary-name` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | `your-cloudinary-key` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | `your-cloudinary-secret` | From Cloudinary dashboard |
| `FRONTEND_URL` | `https://your-frontend-url.onrender.com` | Your frontend Render URL |
| `ADMIN_EMAIL` | `admin@adishrienterprises.com` | Admin email |
| `ADMIN_PASSWORD` | `Admin@123` | Admin password (change in production!) |

---

## 🗄️ MongoDB Atlas Setup (CRITICAL)

### Option 1: Use MongoDB Atlas (Recommended)

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Create Account** (if you don't have one)
3. **Create a Free Cluster**:
   - Click "Build a Database"
   - Choose "M0 Free" tier
   - Select a region close to your Render server
   - Click "Create"

4. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `adishri-admin`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Whitelist IP Addresses**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   - **Note:** For production, you should whitelist only Render's IPs

6. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://username:password@cluster.mongodb.net/adishri?retryWrites=true&w=majority`

7. **Add to Render**:
   - In Render Environment Variables
   - Key: `MONGODB_URI`
   - Value: Your full connection string (with password replaced)

### Option 2: Use Render's MongoDB (If Available)

If you have a MongoDB instance on Render:
1. Go to your MongoDB service
2. Copy the "Internal Connection String"
3. Use that as `MONGODB_URI`

---

## 🔐 Security Best Practices

### JWT_SECRET
**DO NOT use the default!** Generate a strong secret:

```bash
# Generate a secure random string (run locally)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Use the output as your `JWT_SECRET`.

### Admin Password
Change `ADMIN_PASSWORD` to something secure:
- At least 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Example: `Adm!n$ecure2024#Pass`

---

## 📋 Complete Environment Variables Checklist

Copy this template and fill in your values:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adishri?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-64-character-random-hex-string-here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Seed Configuration
ADMIN_EMAIL=admin@adishrienterprises.com
ADMIN_PASSWORD=YourSecurePassword123!

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend.onrender.com
```

---

## 🔄 After Adding Environment Variables

### Step 1: Save and Deploy
1. Click "Save Changes" in Render
2. Render will automatically redeploy
3. Wait for deployment to complete

### Step 2: Verify Deployment
Check the logs for:
```
✅ MongoDB Connected: cluster.mongodb.net
🚀 Server running in production mode
```

### Step 3: Seed Database (First Time Only)
You need to seed the database with initial data. Two options:

**Option A: Use Render Shell**
1. In Render dashboard, go to "Shell" tab
2. Run these commands:
```bash
node src/seeds/userSeeder.js
node src/seeds/coreValueSeeder.js
node src/seeds/standardSeeder.js
node src/seeds/navigationSeeder.js
```

**Option B: Create a Seed Script**
Add to `package.json`:
```json
"scripts": {
  "seed:all": "node src/seeds/userSeeder.js && node src/seeds/coreValueSeeder.js && node src/seeds/standardSeeder.js && node src/seeds/navigationSeeder.js"
}
```

Then in Render Shell:
```bash
npm run seed:all
```

---

## 🧪 Testing Your Deployment

### Test Backend API
```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Should return:
{"success":true,"message":"API is running"}
```

### Test Admin Login
```bash
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@adishrienterprises.com","password":"YourPassword"}'
```

### Test Public Endpoints
```bash
# Core Values
curl https://your-backend.onrender.com/api/core-values

# Standards
curl https://your-backend.onrender.com/api/standards

# Navigation
curl https://your-backend.onrender.com/api/navigation
```

---

## 🐛 Troubleshooting

### Issue: Still Getting MongoDB Error

**Check:**
1. ✅ `MONGODB_URI` is set in Render environment variables
2. ✅ Connection string has password replaced (no `<password>` placeholder)
3. ✅ Database name is included in URI
4. ✅ IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
5. ✅ Database user has correct permissions

**Test Connection String Locally:**
```bash
# In your local backend folder
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect('YOUR_MONGODB_URI').then(() => console.log('✅ Connected')).catch(err => console.error('❌ Error:', err.message));"
```

### Issue: Cloudinary Errors

If you see Cloudinary errors but don't need image uploads yet:
- You can use dummy values for now
- Or create a free Cloudinary account: https://cloudinary.com

### Issue: CORS Errors

If frontend can't connect to backend:
1. Make sure `FRONTEND_URL` is set correctly
2. Update `backend/src/config/cors.js` if needed
3. Redeploy

---

## 📝 Quick Setup Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] All environment variables added to Render
- [ ] JWT_SECRET generated and added
- [ ] Admin password changed
- [ ] Service redeployed
- [ ] Logs show "MongoDB Connected"
- [ ] Database seeded with initial data
- [ ] API health check returns success
- [ ] Admin login works

---

## 🎯 Expected Result

After completing these steps, your Render logs should show:

```
🚀 Server running in production mode
📡 Port: 5000
🔗 URL: http://localhost:5000
📚 API: http://localhost:5000/api
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

And your API should be accessible at:
`https://your-backend-name.onrender.com/api`

---

## 📞 Need Help?

If you're still having issues:
1. Check Render logs for specific error messages
2. Verify MongoDB Atlas connection string format
3. Test connection string locally first
4. Make sure all environment variables are saved

**Common MongoDB URI Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

Replace:
- `username` - Your MongoDB user
- `password` - Your MongoDB password (URL encoded if it has special characters)
- `cluster.mongodb.net` - Your cluster address
- `database-name` - Your database name (e.g., `adishri`)
