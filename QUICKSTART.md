⚡ QUICK START (5 Minutes)
==========================

## 1️⃣ Install Node.js
Download from: https://nodejs.org (LTS version)

## 2️⃣ Create Project Folder
```bash
mkdir linkedin-automation
cd linkedin-automation
```

## 3️⃣ Copy These Files Into Folder
- linkedin-automation.js
- package.json
- README.md (full docs)

## 4️⃣ Install Dependencies
```bash
npm install
```

## 5️⃣ Generate First Post (Test)
```bash
npm run generate-once
```

✅ **Done!** Check `./generated_posts/` folder for:
- 📄 Text file with post content
- 🖼️ Image file  
- 📋 JSON with full data

---

## 📱 Post to LinkedIn (30 seconds)

1. Open: `generated_posts/2024-01-15_post.txt`
2. Copy text (starts with 🚀 or 💡)
3. Go to LinkedIn → "Start a post"
4. Paste text
5. Add image from `generated_posts/images/`
6. Click Post ✅

---

## 🔄 Daily Automation (Pick One)

### **Option A: Manual Check (Simple)**
Run `npm run generate-once` every morning
- Takes 30 seconds
- Copy & paste to LinkedIn

### **Option B: Auto Scheduler (Local)**
```bash
npm start
```
- Generates automatically every day at 9 AM
- Keep terminal open
- Still need to post manually (1 click)

### **Option C: Cloud Automation (Best)**
Push to GitHub → GitHub Actions runs automatically
1. Create GitHub account (free)
2. Push these files to GitHub repo
3. Create `.github/workflows/daily-post.yml` (see template file)
4. Posts auto-generate daily
5. Download from GitHub "Artifacts" tab

---

## 🎯 Customization

### Change Post Time
Edit `linkedin-automation.js` line 11:
```javascript
scheduleTime: '0 9 * * *'  // Change 9 to your hour
```

### Add Your Topics
Edit TOPICS array (line 14+):
```javascript
const TOPICS = [
  {
    category: 'Your Topic',
    subtopics: ['tip 1', 'tip 2', 'tip 3']
  }
];
```

---

## 📊 What Gets Generated

**Daily:**
- Random topic from 4 categories (WordPress, Laravel, Shopify, Web Dev)
- Professional LinkedIn-ready post (150-200 words)
- Relevant image from Unsplash
- Text file ready to copy
- JSON file with metadata

**Cost:** $0 - Everything is free

---

## ❌ Troubleshooting

**"Cannot find module"**
→ Run: `npm install`

**Images not downloading**
→ Check internet, or Unsplash API (rare issue)

**Posts not generating**
→ Run: `npm run generate-once` to test
→ Check error message in console

**Scheduler not running**
→ Keep terminal window open
→ Use GitHub Actions instead (always runs)

---

## 🚀 You're Ready!

**Next:**
```bash
npm run generate-once
```

Then post to LinkedIn. See you trending! 📈
