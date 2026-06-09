# 🚀 LinkedIn Daily Automation - Free Setup Guide

A complete Node.js automation that generates daily LinkedIn posts about WordPress, Laravel, Shopify & web dev with relevant images. **100% FREE**.

---

## 📋 Features

✅ **Generates daily posts** with random topics from 4 categories:
- WordPress tips & tricks
- Laravel/PHP best practices  
- Shopify development insights
- Common web dev problems & solutions

✅ **Automatic image sourcing** from Unsplash (free)
✅ **Professional LinkedIn-ready content** with hooks, tips, and CTAs
✅ **Daily scheduling** (runs at your set time)
✅ **Saves ready-to-post files** (JSON + formatted text)
✅ **Zero cost** - No paid APIs needed

---

## 📦 Installation (5 minutes)

### Step 1: Install Node.js
Download from [nodejs.org](https://nodejs.org) (LTS version recommended)

### Step 2: Clone/Download Files
Create a folder for this project and add:
- `linkedin-automation.js`
- `package.json`

### Step 3: Install Dependencies
```bash
cd your-project-folder
npm install
```

This installs:
- `axios` - for API calls
- `node-cron` - for scheduling

---

## 🎯 Usage

### **Option 1: Generate One Post (Test)**
```bash
npm run generate-once
```
This creates a single post immediately so you can test before automation.

### **Option 2: Run Daily Scheduler**
```bash
npm start
```
Posts are generated daily at 9:00 AM. Edit the time in `linkedin-automation.js`:
```javascript
scheduleTime: '9 0 * * *' // Format: minute hour day month weekday
```

**Common schedules:**
- `'0 9 * * *'` → 9:00 AM daily
- `'0 8 * * *'` → 8:00 AM daily  
- `'30 10 * * *'` → 10:30 AM daily

### **Output Files**
Posts are saved in `./generated_posts/`:
```
generated_posts/
├── images/
│   └── 2024-01-15_WordPress.jpg
├── 2024-01-15_post.txt      (Copy text from here)
└── 2024-01-15_post.json     (Full post data)
```

---

## 📱 How to Post to LinkedIn

1. **Generate a post** → `npm run generate-once`
2. **Open the text file**: `./generated_posts/2024-01-15_post.txt`
3. **Copy the content** (the text starting with 🚀 or 💡)
4. **Go to LinkedIn** → Click "Start a post"
5. **Paste content**
6. **Attach image** from `./generated_posts/images/`
7. **Post!** ✅

*Takes 30 seconds. Can batch 7 posts in 5 minutes for the week.*

---

## 🔧 Advanced Setup (Fully Automated)

### **Deploy on GitHub Actions** (Runs in cloud, 100% free)

1. **Create GitHub account** (free)
2. **Push your project** to GitHub
3. **Create file** `.github/workflows/daily-post.yml`:

```yaml
name: Daily LinkedIn Post

on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM UTC daily
  workflow_dispatch:

jobs:
  generate-post:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run generate-once
      - uses: actions/upload-artifact@v3
        with:
          name: daily-post
          path: generated_posts/
```

4. **Commit and push** - GitHub will auto-run daily and upload posts!
5. **Download posts** from GitHub Actions artifacts every morning

---

## 🖼️ Image Source Options

### **Default (Free, No Setup)**
Uses Unsplash's public API - works out of the box, generates 50+ images/day

### **Upgrade to Unsplash API Key** (Optional, higher limits)
1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Sign up (free)
3. Create app → Get "Access Key"
4. Update in script:
```javascript
unsplashAccessKey: 'YOUR_KEY_HERE'
```

### **Alternative: Pexels API** (Also free)
Replace Unsplash code with:
```javascript
const response = await axios.get('https://api.pexels.com/v1/search', {
  params: { query: searchTerm, per_page: 10 },
  headers: { 'Authorization': 'YOUR_PEXELS_KEY' }
});
```

---

## 💡 Content Generation Options

### **Option 1: Template-Based** (Current - 100% FREE)
- Uses randomized templates
- Always works, no API needed
- Great for consistent, professional posts

### **Option 2: AI-Powered** (Free + optional)

**Using Ollama (Local AI - Completely Free)**
```bash
# Install Ollama from ollama.ai
ollama pull mistral  # Download model (~4GB)
ollama serve  # Runs local LLM on localhost:11434
```

Then update script:
```javascript
const response = await axios.post('http://localhost:11434/api/generate', {
  model: 'mistral',
  prompt: prompt,
  stream: false
});
```

**Using Hugging Face (Free API, no credit card)**
The script already includes this - uncomment the Hugging Face section and it works!

**Using OpenAI Free Trial** ($5 free credits)
1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Update script:
```javascript
const response = await axios.post('https://api.openai.com/v1/chat/completions', {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: prompt }],
  headers: { 'Authorization': `Bearer ${YOUR_API_KEY}` }
});
```

---

## 📊 Scheduling Tips

### **Keep It Consistent**
- Post same time daily (algorithm boost)
- Morning (8-10 AM in your timezone) = best engagement

### **Best Days for Tech Content**
- Tuesday-Thursday get 30% more engagement
- Avoid Sundays
- Post when your audience is active

### **Content Mix Strategy**
- 60% Tips/Education (what the script generates)
- 40% Stories/Case Studies (you add manually)

---

## 🐛 Troubleshooting

### **"Cannot find module 'axios'"**
```bash
npm install
```

### **Images not downloading**
- Check internet connection
- Unsplash API might be rate limited (rare)
- Switch to Pexels API

### **Posts not generating**
- Run `npm run generate-once` to test
- Check console for error messages
- Ensure Node.js is installed: `node --version`

### **Scheduler not running**
- Keep terminal window open
- Or use GitHub Actions (always runs)

---

## 💰 Cost Breakdown

| Component | Cost | Notes |
|-----------|------|-------|
| Node.js | FREE | Open source |
| Unsplash Images | FREE | No auth needed |
| Hosting | FREE | Run locally or use GitHub |
| Content Gen | FREE | Uses templates + optional APIs |
| **Total** | **$0** | ✅ Fully free solution |

**Optional paid upgrades:**
- Ollama (free) vs OpenAI ($0.002 per post)
- Your own server ($5-10/month) vs GitHub (free)

---

## 🎨 Customization

### **Add Your Own Topics**
Edit the TOPICS array in `linkedin-automation.js`:
```javascript
const TOPICS = [
  {
    category: 'Your Category',
    subtopics: [
      'Subtopic 1',
      'Subtopic 2',
      'Subtopic 3'
    ]
  }
];
```

### **Change Post Schedule**
```javascript
scheduleTime: '30 9 * * 1-5'  // 9:30 AM Monday-Friday only
```

### **Add More Hooks/CTAs**
Update the arrays in `generatePostTemplate()`:
```javascript
const hooks = [
  'Your hook here',
  'Another hook',
  // ...
];
```

---

## 📈 Expected Results

**Week 1-2:** 20-50 impressions per post (new account growth)
**Month 1:** 100-300 impressions per post + 5-10 followers/week
**Month 3:** 500-2000 impressions per post + 20-50 followers/week

**Factors:**
- Your existing LinkedIn network
- Post time consistency  
- Quality of engagement (comments vs. scrolls)
- Hashtag relevance

---

## 🚀 Next Steps

1. **Run test**: `npm run generate-once`
2. **Review output** in `./generated_posts/`
3. **Start scheduler**: `npm start` (or deploy to GitHub)
4. **Post daily** (or set up automation)
5. **Engage** - Reply to comments for algorithm boost

---

## 📝 License

MIT - Use freely for personal/business use

---

## ❓ Need Help?

- **Check console errors** - they tell you exactly what's wrong
- **Test with**: `npm run generate-once`
- **Verify Node.js**: `node --version` (should be 14+)

**Common issues solved above in Troubleshooting section**

---

Good luck! You'll have 90+ posts generated automatically. 🎉
