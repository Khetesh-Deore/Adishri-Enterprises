# 🚀 Quick Start Guide - Adishri Enterprises CMS

## Current Status
✅ Backend running on http://localhost:5000
✅ Frontend running on http://localhost:5174

---

## 🎯 Access the System

### Public Website
**URL**: http://localhost:5174
- Home page with all sections
- About, Vision, Products, Contact pages
- All content fetches from API with fallback to static data

### Admin Panel
**URL**: http://localhost:5174/admin/login

**Default Admin Credentials**:
- Email: `admin@adishrienterprises.com`
- Password: `Admin@123`

**Test Editor Account** (created during testing):
- Email: `editor@adishrienterprises.com`
- Password: `NewEditor@123`

---

## 📋 Admin Panel Features

### 1. Dashboard
- Overview of system status
- Quick access to all sections

### 2. Content Management
- **Hero Section**: Edit homepage hero banner
- **About Section**: Edit company information
- **Vision Section**: Edit vision cards and content ✨ NEW
- **Products**: Add, edit, delete products
- **Gallery**: Manage image gallery
- **Contact Info**: Update contact details
- **Site Settings**: Logo, SEO, credentials

### 3. User Management ✨ NEW
- Create new admin/editor users
- Edit user details
- Reset user passwords
- Activate/deactivate users
- Delete users (with protection)
- View user activity

---

## 🔧 What You Can Do Now

### Test Admin Panel
1. Login at http://localhost:5174/admin/login
2. Navigate through all sections
3. Try editing content
4. Create a new user
5. Test the Vision editor

### Test User Management
1. Go to "User Management" in admin panel
2. Click "Add User" to create new user
3. Edit user details
4. Reset a user's password
5. Toggle user active/inactive status

### Test Vision Editor
1. Go to "Vision Section" in admin panel
2. Edit section header (subtitle, title, highlight)
3. Add/remove vision cards
4. Change card icons
5. Save and view changes on public site

### Test Content Updates
1. Edit any content section
2. Save changes
3. View public website to see updates
4. Changes persist in database

---

## 🛠️ Development Commands

### Backend (Port 5000)
```bash
cd backend
npm run dev          # Start development server
npm run seed         # Create admin user
```

### Frontend (Port 5174)
```bash
cd Adishri-Enterprises
npm run dev          # Start development server
npm run build        # Build for production
```

---

## 📝 API Endpoints

### Public Endpoints (No Auth Required)
```
GET  /api/health              # Health check
GET  /api/hero                # Hero section
GET  /api/about               # About section
GET  /api/vision              # Vision section
GET  /api/products            # All products
GET  /api/products/:id        # Single product
GET  /api/gallery             # Gallery images
GET  /api/contact             # Contact info
GET  /api/settings            # Site settings
POST /api/auth/login          # User login
```

### Protected Endpoints (Auth Required)
```
GET  /api/auth/me             # Current user
POST /api/auth/logout         # Logout
PUT  /api/auth/change-password # Change own password
PUT  /api/hero                # Update hero
PUT  /api/about               # Update about
PUT  /api/vision              # Update vision
POST /api/products            # Create product
PUT  /api/products/:id        # Update product
DELETE /api/products/:id      # Delete product
POST /api/gallery             # Add gallery image
DELETE /api/gallery/:id       # Delete gallery image
PUT  /api/contact             # Update contact
PUT  /api/settings            # Update settings
POST /api/upload              # Upload image
```

### Admin-Only Endpoints
```
GET    /api/auth/users                    # Get all users
GET    /api/auth/users/:id                # Get single user
POST   /api/auth/users                    # Create user
PUT    /api/auth/users/:id                # Update user
DELETE /api/auth/users/:id                # Delete user
PUT    /api/auth/users/:id/reset-password # Reset password
```

---

## 🔐 Security Features

### Authentication
- JWT tokens with 7-day expiration
- Secure password hashing (bcrypt)
- Account lockout after 5 failed attempts (30 min)

### Authorization
- Role-based access (admin/editor)
- Admin-only routes for user management
- Protected routes require valid JWT

### Password Requirements
- Minimum 6 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 10 requests per 15 minutes

---

## 🎨 Frontend Features

### Public Site
- Responsive design
- Smooth animations (Framer Motion)
- Loading skeletons
- Error handling with fallback data
- SEO optimized
- Semantic color tokens

### Admin Panel
- Clean, modern UI
- Toast notifications
- Form validation
- Loading states
- Confirmation dialogs
- Responsive sidebar
- Protected routes

---

## 📊 Database Models

### User
- username, email, password (hashed)
- role (admin/editor)
- isActive, loginAttempts, lockUntil
- lastLogin, timestamps

### Vision
- subtitle, title, highlight, description
- cards (array of icon, title, description)
- isActive, timestamps

### Product
- name, description, image
- category, features, specifications
- isActive, order, timestamps

### Hero, About, Gallery, Contact, Settings
- All with appropriate fields
- Image URLs (Cloudinary)
- Timestamps

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is in use: `netstat -ano | findstr :5000`
- Kill process: `taskkill /F /PID <pid>`
- Check MongoDB connection in .env

### Frontend won't start
- Check if port 5173/5174 is in use
- Clear node_modules and reinstall: `npm install`

### Can't login
- Verify admin user exists: `npm run seed` in backend folder
- Check backend is running on port 5000
- Check browser console for errors

### API errors
- Check CORS settings in backend/src/server.js
- Verify JWT token is valid
- Check backend logs for errors

### Images not uploading
- Configure Cloudinary credentials in backend/.env
- Check Cloudinary account is active
- Verify upload endpoint is working

---

## 📦 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/adishri-db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Cloudinary (REQUIRED for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ✅ What's Working

- ✅ User authentication (login/logout)
- ✅ User management (CRUD operations)
- ✅ Password reset functionality
- ✅ Vision content management
- ✅ All content sections editable
- ✅ Image upload ready (needs Cloudinary config)
- ✅ Database persistence
- ✅ Frontend-backend communication
- ✅ Security features
- ✅ Error handling
- ✅ Form validation
- ✅ Loading states
- ✅ Toast notifications

---

## 🎯 Next Steps

### For Testing
1. Test all admin panel features
2. Try creating/editing content
3. Test user management
4. Verify changes persist
5. Test on different browsers

### For Production
1. Set up MongoDB Atlas
2. Configure Cloudinary
3. Change default passwords
4. Update CORS settings
5. Set up SSL certificate
6. Deploy backend and frontend
7. Configure production environment variables

---

## 📞 Support

For detailed test results, see `TESTING_SUMMARY.md`
For project roadmap, see `backend.md`
For requirements, see `requirement.md`

---

**System Status**: ✅ Fully functional and ready for testing
**Last Updated**: January 15, 2026
