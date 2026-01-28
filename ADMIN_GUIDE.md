# 📱 Admin Guide - Update Website Content

## For Non-Technical Users

This guide shows you how to update your Adishri Enterprises website content **without any coding knowledge**.

---

## 🎯 What You Can Update

✅ Homepage text and images  
✅ About page content  
✅ Product listings  
✅ Contact information  
✅ Vision & mission statements  
✅ Gallery images  

**All from Google Sheets - like editing Excel!**

---

## 📝 Step-by-Step: Update Website Content

### Step 1: Open Your Content Sheet

Click this link: [Open Content Sheet](https://docs.google.com/spreadsheets/d/1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI/edit)

You'll see a Google Sheet with multiple tabs at the bottom:
- Hero (Homepage banner)
- About (About page)
- Products (Product listings)
- Contact (Contact info)
- Vision (Vision & mission)
- Gallery (Photo gallery)

### Step 2: Choose What to Edit

Click on the tab you want to edit. For example:
- Want to change homepage title? → Click **Hero** tab
- Want to update phone number? → Click **Contact** tab
- Want to add a product? → Click **Products** tab

### Step 3: Find the Field

Each tab has 2 columns:
- **Column A (key):** Field name - DON'T CHANGE THIS
- **Column B (value):** Content - EDIT THIS

Example:
```
key          | value
-------------|---------------------------
title        | Future of Packaging       ← Edit this
subtitle     | Innovation in Every Bottle ← Edit this
```

### Step 4: Edit the Content

1. Click on the cell in **Column B** (value column)
2. Type your new content
3. Press Enter

**That's it!** The sheet auto-saves.

### Step 5: See Your Changes

1. Wait **30 seconds** (for cache to refresh)
2. Go to your website
3. Refresh the page (press F5 or Ctrl+R)
4. **Your changes are live!** 🎉

---

## 🖼️ How to Update Images

### Method 1: Google Drive (Recommended)

1. **Upload Image**
   - Go to Google Drive
   - Click **New** → **File upload**
   - Select your image

2. **Get Link**
   - Right-click the uploaded image
   - Click **Get link**
   - Change to **"Anyone with the link"**
   - Click **Copy link**

3. **Convert Link**
   - Your link looks like: `https://drive.google.com/file/d/ABC123XYZ/view`
   - Copy the part between `/d/` and `/view` (that's the File ID)
   - Create new link: `https://drive.google.com/uc?export=view&id=ABC123XYZ`

4. **Paste in Sheet**
   - Go to your Google Sheet
   - Find the image field (e.g., `heroImage`)
   - Paste the converted link in Column B
   - Press Enter

### Method 2: Imgur (Easiest)

1. **Upload Image**
   - Go to https://imgur.com/upload
   - Drag and drop your image
   - Wait for upload

2. **Get Link**
   - Right-click the uploaded image
   - Click **Copy image address**

3. **Paste in Sheet**
   - Go to your Google Sheet
   - Find the image field
   - Paste the link in Column B
   - Press Enter

---

## 📋 Common Tasks

### Change Homepage Title

1. Open sheet → **Hero** tab
2. Find row with `title` in Column A
3. Edit Column B with new title
4. Press Enter
5. Wait 30 seconds → Refresh website

### Update Phone Number

1. Open sheet → **Contact** tab
2. Find row with `phone` in Column A
3. Edit Column B with new number
4. Press Enter
5. Wait 30 seconds → Refresh website

### Add New Product

1. Open sheet → **Products** tab
2. Scroll to bottom
3. Add new rows:
   ```
   product5Name        | New Product Name
   product5Description | Product description here
   product5Image       | https://image-url.com/product5.jpg
   product5Price       | $99.99
   ```
4. Press Enter
5. Wait 30 seconds → Refresh website

### Change About Page Image

1. Upload new image (see "How to Update Images" above)
2. Copy image URL
3. Open sheet → **About** tab
4. Find row with `aboutImage` in Column A
5. Paste new URL in Column B
6. Press Enter
7. Wait 30 seconds → Refresh website

### Update Email Address

1. Open sheet → **Contact** tab
2. Find row with `email` in Column A
3. Edit Column B with new email
4. Press Enter
5. Wait 30 seconds → Refresh website

---

## ⚠️ Important Rules

### ✅ DO:
- ✅ Edit Column B (value) only
- ✅ Keep text short and clear
- ✅ Use high-quality images
- ✅ Test changes after updating
- ✅ Save regularly (auto-saves)

### ❌ DON'T:
- ❌ Don't edit Column A (key)
- ❌ Don't delete column headers
- ❌ Don't rename tabs
- ❌ Don't delete rows (edit them instead)
- ❌ Don't use very large images (compress first)

---

## 🎨 Content Guidelines

### Text Content
- **Titles:** Keep under 10 words
- **Descriptions:** 2-3 sentences max
- **Buttons:** 1-3 words (e.g., "Learn More", "Contact Us")

### Images
- **Size:** 1200x800 pixels recommended
- **Format:** JPG or PNG
- **File size:** Under 500KB (compress if needed)
- **Quality:** High resolution, clear, professional

### Links
- **Internal:** Use `/products`, `/about`, `/contact`
- **External:** Use full URL: `https://example.com`
- **Email:** Use `mailto:email@example.com`
- **Phone:** Use `tel:+919876543210`

---

## 🐛 Troubleshooting

### Changes Not Showing?

**Problem:** I edited the sheet but website still shows old content

**Solutions:**
1. Wait 5 minutes (cache refresh time)
2. Clear browser cache:
   - Chrome: Ctrl+Shift+Delete → Clear cache
   - Or just press Ctrl+Shift+R
3. Check you edited Column B (not Column A)
4. Make sure sheet is saved (check top left for "All changes saved")

### Image Not Loading?

**Problem:** Image URL in sheet but not showing on website

**Solutions:**
1. Check URL is direct image link (ends with .jpg or .png)
2. Verify image is public (not private)
3. Use HTTPS link (not HTTP)
4. Try uploading to Imgur instead

### Can't Edit Sheet?

**Problem:** Sheet is read-only

**Solutions:**
1. Ask admin for edit access
2. Make sure you're logged into correct Google account
3. Check you have permission to edit

---

## 📞 Need Help?

### Quick Checks
1. ✅ Is sheet saved? (Check top left)
2. ✅ Did you wait 30 seconds?
3. ✅ Did you refresh website?
4. ✅ Are you editing Column B?

### Still Stuck?
1. Take screenshot of what you're trying to do
2. Note what's not working
3. Contact your web developer

---

## 🎯 Quick Reference

| Task | Tab | Field | Example |
|------|-----|-------|---------|
| Homepage title | Hero | title | Future of Packaging |
| Homepage image | Hero | heroImage | https://image-url.com/hero.jpg |
| About text | About | description | Company description... |
| Phone number | Contact | phone | +91 98765 43210 |
| Email | Contact | email | info@company.com |
| Product name | Products | product1Name | HDPE Bottles |
| Product image | Products | product1Image | https://image-url.com/p1.jpg |

---

## 🎉 You're Ready!

You can now update your website content anytime, anywhere!

**Just edit the sheet → Wait 30 seconds → Refresh website** ✨

No coding. No technical knowledge. Just edit like Excel!

---

## 📚 More Help

- **Quick Start:** See `GOOGLE_SHEETS_QUICK_START.md`
- **Templates:** See `GOOGLE_SHEETS_TEMPLATE.md`
- **Full Guide:** See `GOOGLE_SHEETS_CMS_SETUP.md`

---

**Happy Editing! 🚀**
