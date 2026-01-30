# About Page Admin - Quick Reference

## 🚀 Start Servers

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd Adishri-Enterprises && npm run dev
```

## 🔐 Login

**URL:** http://localhost:5173/admin/login
- Username: `admin`
- Password: `Admin@123`

## ✏️ Edit About Page

**URL:** http://localhost:5173/admin/about

### Sections You Can Edit:

#### 1. Basic Information
- Title (e.g., "About Adishri Enterprises")
- Subtitle (e.g., "Excellence in Plastic Packaging")
- Description (main intro paragraph)
- Experience Years (e.g., "15")
- About Text (first paragraph)
- Facility Text (second paragraph)
- Mission Description
- Vision Description

#### 2. Excellence Section Images ⭐ NEW
- Click "Add Image" (max 3)
- Upload product/facility photos
- Add alt text for each image
- Images appear in grid layout on About page

**Recommended sizes:**
- Image 1: 600x800px (large, left side)
- Image 2 & 3: 600x400px (small, right side)

#### 3. Capacity Statistics
- Click "Add Stat" (unlimited)
- Label: "Daily Production"
- Value: "10,000+"
- Suffix: "Units"

#### 4. Packaging Features
- Click "Add Feature" (unlimited)
- Enter feature text: "HDPE Bottles (200ml to 5L)"

#### 5. Industries We Serve
- Click "Add Industry" (unlimited)
- Select Icon: Home, Tractor, Beaker, Package
- Select Color: Blue, Green, Purple, Red, Orange, Pink
- Enter Name: "Home Appliances"
- Enter Description: "Packaging solutions for..."

#### 6. Manufacturing Excellence Banner
- Edit Title: "Manufacturing Excellence"
- Edit Description: "Our advanced facility..."
- **Click "Add Stat" (max 4)** ⭐ NEW
  - Select Icon: Factory, Package, Beaker, Tractor
  - Value: "24/7"
  - Label: "Production"

## 💾 Save Changes

Click the "Save Changes" button at the top right.

## 👀 View Live

**URL:** http://localhost:5173/about

## 🎯 What's New

### Excellence Images
- Upload custom images instead of using default `/product1.jpeg`
- Each image has alt text for SEO
- Stored on Cloudinary CDN

### Manufacturing Stats
- Customize the banner statistics
- Choose icons that match your message
- Add 2-4 stats with custom values

## ⚠️ Important Notes

- All fields are saved to MongoDB
- Images are uploaded to Cloudinary
- Changes appear instantly on the live site
- Title and Description are required fields
- Maximum 3 excellence images
- Maximum 4 manufacturing stats

## 🔄 Fallback Behavior

If you don't upload images or add stats:
- System uses default images from `/public` folder
- Default manufacturing stats: "24/7 Production" and "3L+ Monthly Units"

## ✅ Success Indicators

- Green toast notification: "About section updated!"
- No console errors
- Changes visible on About page
- Images load correctly
- Stats display properly

## 🐛 Troubleshooting

**Images not uploading?**
- Check Cloudinary credentials in `backend/.env`
- Ensure file size is under 2MB
- Check file format (JPEG/PNG)

**Changes not saving?**
- Ensure you're logged in
- Check backend is running
- Look for errors in browser console
- Verify MongoDB connection

**Changes not showing?**
- Hard refresh the page (Ctrl+Shift+R)
- Clear browser cache
- Check if backend is running

## 📚 Full Documentation

See `ABOUT_PAGE_IMAGES_UPDATE.md` for complete technical details.
