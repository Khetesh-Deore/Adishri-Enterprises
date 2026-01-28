# 🚀 Google Sheets CMS - Quick Start Guide

## What You Got

Your Adishri Enterprises website can now be updated via Google Sheets - **no coding, no redeployment needed!**

---

## ⚡ 3-Minute Setup

### Step 1: Open Your Google Sheet

**Your Sheet:** https://docs.google.com/spreadsheets/d/1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI/edit

### Step 2: Create Tabs

Create these tabs at the bottom of your sheet:
- `Hero`
- `About`
- `Products`
- `Contact`
- `Vision`
- `Gallery`

### Step 3: Add Content

In each tab, create 2 columns:

**Column A Header:** `key`  
**Column B Header:** `value`

Example for **Hero** tab:

| key | value |
|-----|-------|
| title | Future of Packaging |
| subtitle | Innovation in Every Bottle |
| description | Leading manufacturer of premium HDPE & LDPE bottles |
| heroImage | https://your-image-url.com/hero.jpg |
| ctaText | Explore Products |
| ctaLink | /products |

### Step 4: Make Public

1. Click **Share** button (top right)
2. Change to **"Anyone with the link"** → **Viewer**
3. Click **Done**

### Step 5: Enable in Website

Update `.env` file:

```env
VITE_USE_GOOGLE_SHEETS=true
VITE_SHEETS_PRIORITY=false
```

### Step 6: Test

Open `test-google-sheets.html` in browser to verify connection.

---

## 📝 How to Update Content

### Update Text:
1. Open Google Sheet
2. Find the row with the text you want to change
3. Edit the `value` column
4. Save (auto-saves)
5. Wait 30 seconds
6. Refresh website → **See changes!** ✨

### Update Images:
1. Upload image to Google Drive/Imgur
2. Get direct image URL
3. Paste URL into Google Sheet `value` column
4. Save
5. **Website updates automatically!** 🖼️

---

## 🖼️ Quick Image Upload

### Google Drive Method:
1. Upload to Drive
2. Right-click → Get link → "Anyone with link"
3. Copy File ID from: `https://drive.google.com/file/d/FILE_ID/view`
4. Convert to: `https://drive.google.com/uc?export=view&id=FILE_ID`
5. Paste in sheet

### Imgur Method (Easiest):
1. Go to https://imgur.com/upload
2. Upload image
3. Right-click → Copy image address
4. Paste in sheet

---

## 📋 Content Templates

### Hero Section
```
key             | value
----------------|----------------------------------
title           | Your Main Title
subtitle        | Your Subtitle
description     | Your description text
heroImage       | https://image-url.com/hero.jpg
ctaText         | Button Text
ctaLink         | /products
badge           | 🚀 New Feature
```

### About Section
```
key                  | value
---------------------|----------------------------------
title                | About Us
subtitle             | Our Story
description          | Company description...
aboutImage           | https://image-url.com/about.jpg
missionDescription   | Our mission statement...
visionDescription    | Our vision statement...
stat1Value           | 15+
stat1Label           | Years Experience
```

### Products Section
```
key                  | value
---------------------|----------------------------------
title                | Our Products
subtitle             | Premium Quality
product1Name         | Product Name
product1Description  | Product description...
product1Image        | https://image-url.com/product1.jpg
product1Price        | $99.99
```

### Contact Section
```
key          | value
-------------|----------------------------------
title        | Contact Us
email        | info@company.com
phone        | +91 98765 43210
whatsapp     | +91 98765 43210
address      | Your full address
mapUrl       | https://maps.google.com/?q=location
```

---

## 🎯 Admin Panel

Access Google Sheets CMS admin:

**URL:** `http://localhost:5173/admin/google-sheets`

Features:
- Test connection to all tabs
- View current data
- Clear cache
- Quick links to edit sheet

---

## ✅ Testing Checklist

- [ ] Created all 6 tabs (Hero, About, Products, Contact, Vision, Gallery)
- [ ] Added `key` and `value` columns to each tab
- [ ] Filled in content using templates
- [ ] Made sheet public (Anyone with link → Viewer)
- [ ] Updated `.env` with Google Sheets config
- [ ] Tested connection with `test-google-sheets.html`
- [ ] Verified changes appear on website

---

## 🐛 Quick Troubleshooting

**Changes not showing?**
- Wait 5 minutes (cache refresh)
- Clear browser cache (Ctrl+Shift+R)
- Check sheet is public

**Images not loading?**
- Use direct image URL (not preview page)
- Verify image is public
- Use HTTPS URLs only

**Sheet not found?**
- Check Sheet ID in `.env`
- Verify sheet is public
- Check tab names match exactly

---

## 📚 Full Documentation

- **Complete Setup:** [GOOGLE_SHEETS_CMS_SETUP.md](./GOOGLE_SHEETS_CMS_SETUP.md)
- **Templates:** [GOOGLE_SHEETS_TEMPLATE.md](./GOOGLE_SHEETS_TEMPLATE.md)
- **Technical Docs:** [Adishri-Enterprises/GOOGLE_SHEETS_README.md](./Adishri-Enterprises/GOOGLE_SHEETS_README.md)

---

## 🎉 You're Done!

Your website now updates from Google Sheets!

**Edit → Save → See Changes** ✨

No coding. No deployment. Just edit and go! 🚀

---

## 📞 Need Help?

1. Check [GOOGLE_SHEETS_CMS_SETUP.md](./GOOGLE_SHEETS_CMS_SETUP.md) for detailed guide
2. Test API: https://opensheet.vercel.app/1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI/Hero
3. Open browser console (F12) to see errors

---

**Happy Editing! 🎨**
