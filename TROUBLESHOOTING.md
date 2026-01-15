# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Login Issues - Account Locked (423 Error)

**Problem**: Getting "Account locked" or 423 error when trying to login.

**Cause**: After 5 failed login attempts, the account is automatically locked for 30 minutes for security.

**Solution**:

**Option A: Wait 30 minutes**
The account will automatically unlock after 30 minutes.

**Option B: Unlock immediately**
Run the unlock script:
```bash
cd backend
npm run unlock
```

**Option C: Quick unlock (one-liner)**
```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => { const User = require('./src/models/User'); User.findOne({email: 'admin@adishrienterprises.com'}).then(user => { if(user) { user.loginAttempts = 0; user.lockUntil = undefined; user.save().then(() => { console.log('Admin unlocked!'); process.exit(0); }); } }); });"
```

---

### 2. Login Issues - Invalid Credentials (401 Error)

**Problem**: Getting "Invalid email or password" error.

**Cause**: Wrong email or password entered, or password in database is incorrect.

**Solution**:

**Default Credentials**:
- Email: `admin@adishrienterprises.com`
- Password: `Admin@123`

**Quick Password Reset**:
```bash
cd backend
npm run reset-password
```

**Or reset with custom credentials**:
```bash
cd backend
npm run reset-password admin@adishrienterprises.com NewPassword123
```

**Or recreate admin user**:
```bash
cd backend
npm run seed
```

This will recreate the admin user with default credentials.

---

### 3. Backend Not Starting

**Problem**: Backend server won't start or crashes.

**Possible Causes & Solutions**:

**A. Port 5000 already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /F /PID <pid>

# Then restart
npm run dev
```

**B. MongoDB not connected**
- Check `backend/.env` has correct `MONGODB_URI`
- Make sure MongoDB is running (local or Atlas)
- Test connection:
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected!')).catch(err => console.error(err));"
```

**C. Missing dependencies**
```bash
cd backend
npm install
```

---

### 4. Frontend Not Starting

**Problem**: Frontend won't start or shows errors.

**Solutions**:

**A. Port 5173/5174 in use**
Vite will automatically try the next available port.

**B. Missing dependencies**
```bash
cd Adishri-Enterprises
npm install
```

**C. Clear cache and restart**
```bash
cd Adishri-Enterprises
rm -rf node_modules .vite
npm install
npm run dev
```

---

### 5. API Connection Issues

**Problem**: Frontend can't connect to backend API.

**Solutions**:

**A. Check backend is running**
Visit: http://localhost:5000/api/health

**B. Check CORS settings**
In `backend/src/server.js`, verify CORS origin matches frontend URL:
```javascript
cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
})
```

**C. Check frontend API URL**
In `Adishri-Enterprises/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

---

### 6. Images Not Loading

**Problem**: Product images or gallery images not showing.

**Solutions**:

**A. Check image paths**
Images should be in `Adishri-Enterprises/public/` folder:
- product1.jpeg through product8.jpeg
- adishri_logo3.png

**B. Check Cloudinary configuration** (for uploads)
In `backend/.env`:
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**C. Image upload not working**
- Verify Cloudinary credentials are correct
- Check file size (max 5MB)
- Check file type (JPEG, PNG, GIF, WebP only)

---

### 7. Database Empty After Restart

**Problem**: All data is gone after restarting servers.

**Solution**:

**Re-seed the database**:
```bash
cd backend
npm run seed:all
```

This will populate:
- Admin user
- Hero section
- About section
- Vision section
- 8 Products
- 8 Gallery images
- Contact info
- Settings

---

### 8. Admin Panel Not Loading

**Problem**: Admin panel shows blank page or errors.

**Solutions**:

**A. Check if logged in**
- Visit: http://localhost:5174/admin/login
- Login with default credentials

**B. Clear browser cache**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear localStorage:
```javascript
// In browser console
localStorage.clear();
```

**C. Check browser console**
- Open DevTools (F12)
- Look for errors in Console tab
- Check Network tab for failed requests

---

### 9. Gallery Page Not Working

**Problem**: Gallery page shows no images or errors.

**Solutions**:

**A. Seed gallery data**
```bash
cd backend
npm run seed:gallery
```

**B. Check API endpoint**
Visit: http://localhost:5000/api/gallery

Should return JSON with gallery images.

**C. Check category filter**
Gallery model uses these categories:
- `products`
- `factory`
- `team`
- `events`
- `general`

---

### 10. "Loading..." Stuck Forever

**Problem**: Page shows "Loading..." and never loads content.

**Solutions**:

**A. Check backend is running**
```bash
# Should show server logs
cd backend
npm run dev
```

**B. Check API responses**
Open browser DevTools → Network tab
Look for failed API requests (red)

**C. Check for JavaScript errors**
Open browser DevTools → Console tab
Look for error messages

---

## Quick Diagnostics

### Check System Status

**1. Backend Health**
```bash
curl http://localhost:5000/api/health
```
Should return: `{"success":true,"message":"API is running"}`

**2. Database Connection**
```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(err => console.error('❌ Error:', err.message));"
```

**3. Check Admin User**
```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => { const User = require('./src/models/User'); User.findOne({email: 'admin@adishrienterprises.com'}).then(user => { console.log(user ? '✅ Admin exists' : '❌ Admin not found'); process.exit(0); }); });"
```

**4. Check Products Count**
```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => { const Product = require('./src/models/Product'); Product.countDocuments().then(count => { console.log('Products:', count); process.exit(0); }); });"
```

---

## Environment Variables Checklist

### Backend (.env)
```env
# Required
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/adishri-db
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173

# Optional (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Reset Everything

If all else fails, reset the entire system:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Clear backend
cd backend
rm -rf node_modules
npm install

# 3. Clear frontend
cd ../Adishri-Enterprises
rm -rf node_modules .vite
npm install

# 4. Reset database
cd ../backend
npm run seed:all

# 5. Start backend
npm run dev

# 6. Start frontend (in new terminal)
cd ../Adishri-Enterprises
npm run dev
```

---

## Getting Help

### Check Logs

**Backend Logs**:
Look at the terminal where `npm run dev` is running in backend folder.

**Frontend Logs**:
- Browser Console (F12 → Console tab)
- Terminal where `npm run dev` is running in frontend folder

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| EADDRINUSE | Port already in use | Kill process using that port |
| ECONNREFUSED | Can't connect to MongoDB | Check MongoDB is running |
| 401 Unauthorized | Invalid credentials | Check email/password |
| 423 Locked | Account locked | Run unlock script |
| 404 Not Found | Route doesn't exist | Check API endpoint URL |
| 500 Server Error | Backend error | Check backend logs |

---

## Useful Commands

```bash
# Backend
npm run dev            # Start development server
npm run seed:all       # Seed entire database
npm run unlock         # Unlock admin account
npm run reset-password # Reset admin password to default

# Frontend
npm run dev            # Start development server
npm run build          # Build for production

# Database
npm run seed           # Create admin user only
npm run seed:products  # Seed products only
npm run seed:gallery   # Seed gallery only
```

---

## Contact & Support

For additional help:
1. Check `QUICK_START.md` for usage guide
2. Check `DATABASE_MIGRATION_COMPLETE.md` for database info
3. Check `TESTING_SUMMARY.md` for API endpoints
4. Check `IMPLEMENTATION_COMPLETE.md` for features

---

**Last Updated**: January 15, 2026
