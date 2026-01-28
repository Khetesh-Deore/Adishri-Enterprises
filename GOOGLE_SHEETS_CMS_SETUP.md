# Google Sheets CMS Setup Guide

## 🎯 Overview
This guide shows you how to update your Adishri Enterprises website content using Google Sheets - **NO coding, NO redeployment, NO backend needed!**

Admin simply edits Google Sheet → Website updates LIVE on Vercel ✨

---

## 📋 Quick Setup (5 Minutes)

### Step 1: Create Your Google Sheet

1. **Open your existing sheet**: https://docs.google.com/spreadsheets/d/1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI/edit

2. **Create tabs for each section** (bottom of sheet):
   - `Hero` - Homepage hero section
   - `About` - About page content
   - `Products` - Products information
   - `Contact` - Contact details
   - `Vision` - Vision & mission
   - `Gallery` - Gallery images

3. **Each tab should have 2 columns**:
   - Column A: `key` (field name)
   - Column B: `value` (content)

---

### Step 2: Sheet Structure Examples

#### **Hero Tab** (Homepage Banner)
| key | value |
|-----|-------|
| title | Future of Packaging |
| subtitle | Innovation in Every Bottle |
| description | Leading manufacturer of premium HDPE & LDPE bottles for pharmaceutical, food & beverage industries |
| ctaText | Explore Products |
| ctaLink | /products |
| badge | 🚀 Innovation Leader |
| heroImage | https://your-image-url.com/hero.jpg |

#### **About Tab**
| key | value |
|-----|-------|
| title | About Adishri Enterprises |
| subtitle | Excellence in Plastic Packaging |
| description | With over 15 years of experience in manufacturing high-quality plastic bottles... |
| aboutImage | https://your-image-url.com/about.jpg |
| missionTitle | Our Mission |
| missionDescription | To provide superior quality plastic packaging solutions... |
| visionTitle | Our Vision |
| visionDescription | To become India's most trusted name in plastic packaging... |
| stat1Value | 15+ |
| stat1Label | Years Experience |
| stat2Value | 500+ |
| stat2Label | Happy Clients |
| stat3Value | 10M+ |
| stat3Label | Bottles Produced |

#### **Products Tab**
| key | value |
|-----|-------|
| title | Our Products |
| subtitle | Premium Quality Plastic Bottles |
| description | We manufacture a wide range of HDPE and LDPE bottles... |
| product1Name | HDPE Bottles |
| product1Description | High-density polyethylene bottles for pharmaceuticals |
| product1Image | https://your-image-url.com/product1.jpg |
| product1Price | Contact for pricing |
| product2Name | LDPE Bottles |
| product2Description | Low-density polyethylene bottles for food & beverage |
| product2Image | https://your-image-url.com/product2.jpg |

#### **Contact Tab**
| key | value |
|-----|-------|
| title | Get In Touch |
| subtitle | We'd Love to Hear From You |
| email | info@adishrienterprises.com |
| phone | +91 98765 43210 |
| address | 123 Industrial Area, Mumbai, Maharashtra 400001 |
| whatsapp | +91 98765 43210 |
| mapUrl | https://maps.google.com/?q=your-location |

#### **Vision Tab**
| key | value |
|-----|-------|
| title | Our Vision & Mission |
| visionTitle | Vision |
| visionDescription | To be the leading manufacturer of eco-friendly packaging... |
| missionTitle | Mission |
| missionDescription | Deliver innovative, sustainable packaging solutions... |
| value1Title | Quality |
| value1Description | Uncompromising quality in every product |
| value1Icon | ✓ |
| value2Title | Innovation |
| value2Description | Continuous improvement and innovation |
| value2Icon | 💡 |

---

### Step 3: Upload Images

**Option A: Google Drive** (Recommended)
1. Upload image to Google Drive
2. Right-click → Get link → Set to "Anyone with link can view"
3. Copy the file ID from URL: `https://drive.google.com/file/d/FILE_ID/view`
4. Convert to direct link: `https://drive.google.com/uc?export=view&id=FILE_ID`
5. Paste into Google Sheet

**Option B: Imgur** (Easiest)
1. Go to https://imgur.com/upload
2. Upload image
3. Right-click image → Copy image address
4. Paste URL into Google Sheet

**Option C: Cloudinary** (Professional)
1. Upload to Cloudinary
2. Copy secure URL
3. Paste into Google Sheet

---

### Step 4: Make Sheet Public

1. Click **Share** button (top right)
2. Change to **"Anyone with the link"** → **Viewer**
3. Click **Done**

✅ Your sheet is now ready!

---

### Step 5: Enable Google Sheets in Your Website

Update your `.env` file:

```env
# Enable Google Sheets CMS
VITE_USE_GOOGLE_SHEETS=true

# Priority mode (true = Sheets override MongoDB, false = MongoDB primary)
VITE_SHEETS_PRIORITY=false
```

**Modes:**
- `VITE_SHEETS_PRIORITY=false` → MongoDB primary, Sheets as fallback
- `VITE_SHEETS_PRIORITY=true` → Sheets override MongoDB completely

---

## 🎨 Admin Workflow (Super Easy!)

### To Update Text:
1. Open Google Sheet
2. Find the `key` you want to change
3. Edit the `value` column
4. Save (Ctrl+S or auto-saves)
5. **Website updates in ~30 seconds!** 🎉

### To Update Images:
1. Upload new image (Google Drive/Imgur/Cloudinary)
2. Copy image URL
3. Paste into Google Sheet `value` column
4. Save
5. **Website updates automatically!** 🖼️

---

## 🚀 Testing Your Setup

1. **Edit a value** in your Google Sheet (e.g., change hero title)
2. **Wait 30 seconds** (cache refresh)
3. **Reload your website**
4. **See the change!** ✨

---

## 📊 Content You Can Update

### ✅ Text Content
- Titles, subtitles, descriptions
- Button text and links
- Contact information
- Statistics and numbers
- Mission, vision statements

### ✅ Images
- Hero banners
- Product images
- Gallery photos
- About section images
- Team photos
- Logos

### ✅ Links
- Call-to-action buttons
- Navigation links
- Social media links
- External resources

---

## 🔧 Advanced Features

### Auto-Refresh Content
Content automatically refreshes every 5 minutes. To force refresh:
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### Multiple Admins
Multiple people can edit the sheet simultaneously. Google Sheets handles conflicts automatically.

### Version History
Google Sheets keeps full edit history:
- File → Version history → See version history
- Restore any previous version if needed

---

## 🎯 Best Practices

### ✅ DO:
- Use high-quality images (1200x800px recommended)
- Keep titles short and impactful (3-7 words)
- Test changes on staging before production
- Use consistent naming for keys
- Backup your sheet regularly

### ❌ DON'T:
- Don't delete the `key` column headers
- Don't use special characters in keys (use camelCase)
- Don't upload huge images (compress first)
- Don't share edit access publicly

---

## 🐛 Troubleshooting

### Changes not showing?
1. Wait 5 minutes (cache duration)
2. Clear browser cache (Ctrl+Shift+R)
3. Check sheet is public (Anyone with link → Viewer)
4. Verify VITE_USE_GOOGLE_SHEETS=true in .env

### Images not loading?
1. Verify image URL is direct link (not preview page)
2. Check image is publicly accessible
3. Use HTTPS URLs only
4. Try different image host (Imgur is most reliable)

### Sheet not found error?
1. Verify Sheet ID in `googleSheets.js`
2. Check sheet is public
3. Verify tab names match exactly (case-sensitive)

---

## 📞 Support

Need help? Check:
1. Browser console for errors (F12)
2. Network tab to see API calls
3. Google Sheets API status: https://opensheet.vercel.app/

---

## 🎉 You're All Set!

Your website now has a **live CMS** powered by Google Sheets!

**No coding. No deployment. Just edit and go!** ✨

---

## 📝 Quick Reference

**Your Sheet ID:** `1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI`

**API Endpoint:** `https://opensheet.vercel.app/1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI/[TabName]`

**Test URL:** https://opensheet.vercel.app/1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI/Hero

---

**Happy Editing! 🚀**
