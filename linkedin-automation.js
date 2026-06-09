const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

// Configuration
const CONFIG = {
  postsDir: './generated_posts',
  imagesDir: './generated_posts/images',
  unsplashAccessKey: '', // Optional: add your Unsplash API key for higher limits
  scheduleTime: '9 0 * * *' // Daily at 9:00 AM (change as needed)
};

// Topic pool with subtopics for variety
const TOPICS = [
  {
    category: 'WordPress',
    subtopics: [
      'WordPress custom hooks and filters',
      'WordPress security best practices',
      'WordPress performance optimization',
      'WordPress plugin development tips',
      'WordPress theme customization',
      'WordPress database optimization',
      'REST API in WordPress'
    ]
  },
  {
    category: 'Laravel',
    subtopics: [
      'Laravel Eloquent relationships',
      'Laravel middleware patterns',
      'Laravel caching strategies',
      'Laravel queue jobs',
      'Laravel testing best practices',
      'Laravel API development',
      'Laravel migrations and seeders'
    ]
  },
  {
    category: 'Shopify',
    subtopics: [
      'Shopify custom app development',
      'Shopify theme optimization',
      'Shopify liquid templating',
      'Shopify performance tuning',
      'Shopify API webhooks',
      'Shopify metafields usage',
      'Shopify storefront development'
    ]
  },
  {
    category: 'Web Dev Problems',
    subtopics: [
      'Debugging common PHP errors',
      'CORS issues and solutions',
      'Database connection pooling',
      'Memory leaks in web apps',
      'API rate limiting',
      'Load balancing strategies',
      'SQL injection prevention'
    ]
  }
];

// Generate random topic
function getRandomTopic() {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const subtopic = topic.subtopics[Math.floor(Math.random() * topic.subtopics.length)];
  return { category: topic.category, subtopic };
}

// Generate post content (using free method - you can replace with API call)
async function generatePostContent(topic) {
  const prompt = `You are a social media expert. Create an engaging LinkedIn post (150-200 characters) about "${topic.subtopic}". 
  
  The post should:
  - Start with a hook or question
  - Include 2-3 actionable tips or insights
  - Use 1-2 relevant hashtags
  - Be professional but conversational
  - End with a CTA (call-to-action)
  
  Return ONLY the post text, nothing else.`;

  try {
    // Option 1: Using Hugging Face API (free, no credit card needed for inference)
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      { inputs: prompt },
      { timeout: 30000 }
    );

    // Note: If Hugging Face doesn't work, use local generation (see instructions)
    if (response.data && response.data[0]) {
      return response.data[0].generated_text.split('\n').slice(-1)[0].trim();
    }
  } catch (error) {
    console.log('API call failed, using template instead');
    // Fallback: Generate post from template
    return generatePostTemplate(topic);
  }
}

// Authentic developer posts (sounds human, not AI)
function generatePostTemplate(topic) {
  
  // Real developer experiences and stories
  const postTemplates = {
    'WordPress': [
      `Just spent 4 hours debugging a WordPress performance issue. Client said "it's slow" - turns out 47 plugins, no caching, and a 5MB banner image.

After optimization:
• Enabled object caching
• Reduced plugins to 12
• Minified assets
• Page load: 8s → 1.2s ⚡

Simple fixes but HUGE impact. What's your biggest WordPress bottleneck?`,

      `WordPress hooks saved me again today. Custom filter in 10 lines of code instead of modifying core files.

3 years in, still amazed how powerful the hook system is:
• Before: Editing core files (nightmare for updates)
• Now: Clean hooks (updates work fine)

If you're still modifying core, please stop. Hooks are your friend.`,

      `Built a custom WordPress dashboard for a client today. Removed all the clutter they don't need.

People underestimate how much better WordPress feels when it's clean:
• Hide unused post types
• Custom columns
• Quick edit shortcuts
• Remove metaboxes they never use

Small UX touches but users LOVE it. What do you customize?`,

      `"WordPress is not a real framework" - said someone who's never built complex stuff with it.

Just finished a 50+ page site with:
• Custom post types (4)
• ACF relationships (5)
• Custom taxonomies
• Webhook integrations
• API endpoints

With good architecture, WordPress scales. Most people just don't structure properly.`,

      `PSA: If your WordPress site is slow, it's probably these things (in order):
1. Unoptimized images (90% of cases)
2. Too many plugins
3. No caching
4. Bad hosting
5. Actual code issues (5% of cases)

Audit before optimizing. Most people jump to #5 first.`
    ],

    'Laravel': [
      `Built 3 Laravel APIs this month. The BEST part? Eloquent relationships make my code so clean.

hasMany(), belongsTo(), belongsToMany() - these 3 methods saved me hundreds of lines of code.

New to Laravel? Learn relationships FIRST, not last. Changes everything about how you structure data.`,

      `Laravel middleware just saved a client $200/month on database calls. 

Implemented caching middleware:
• Check cache
• Return cached response
• Update cache on fresh requests
• Reduced DB hits by 60%

5 minutes of code. Big results. Middleware > Controllers for cross-cutting concerns.`,

      `The thing about Laravel queues that nobody tells you: they're not just for emails.

Using them for:
• Heavy data processing
• API calls
• Image manipulation
• Report generation
• Webhook handling

Your users don't care how it gets done. They care it doesn't freeze their page. Queues are magic for that.`,

      `Laravel testing saved me from a terrible bug this week. 

Wrote a test for a complex calculation → found a rounding error → fixed before production.

People skip tests because "it takes too long" but:
• 1 hour writing tests
• 0 hours debugging in production

Tests are insurance. Good insurance.`,

      `Laravel's service container is confusing until it clicks, then it's beautiful.

Spent 2 weeks confused. Now can't imagine coding without it.

Dependency injection beats "new ClassName()" by miles:
• Easier to test
• Decoupled code
• Flexible
• Maintainable

If you're new to Laravel, this is the hardest but most valuable concept.`
    ],

    'Shopify': [
      `Shopify apps are underrated. Just built a custom inventory app for a client and they're saving 5 hours/week.

Shopify's GraphQL API is solid. Takes time to learn but so worth it.

If you're thinking about building Shopify tools, do it. The ecosystem needs more good apps.`,

      `Liquid template language is weird until you stop thinking like a programmer and think like a template.

Took me a week to stop fighting it. Now it feels natural.

Tip: Don't try to do heavy logic in Liquid. Keep it in your theme JS. Liquid is for display, not logic.`,

      `Shopify metafields changed everything for our theme customization.

Before: Custom tables in database (nightmare)
Now: Metafields + GraphQL (clean AF)

If you're building Shopify custom apps, metafields are your best friend. Learn them.`,

      `Just helped a Shopify store go from 3s to 0.8s load time. 

It was:
• Unoptimized images (always)
• Too many apps (10 → 4)
• Theme code bloat
• No lazy loading

Shopify stores don't need to be slow. Most just are because nobody optimizes.`,

      `Building on Shopify vs traditional e-commerce: 

Shopify advantages:
• Fast to build
• Updates handled
• Security built-in
• Payment processing done

Disadvantages:
• Limited flexibility
• App costs add up
• Customization battles

It's a tradeoff. Know what you're getting into. For 90% of stores? Shopify is the right choice.`
    ],

    'Web Dev Problems': [
      `Just fixed a CORS issue that took way longer than it should have.

People see "Access-Control-Allow-Origin" and panic. But it's just:
• Browser security feature
• Backend needs to allow frontend domain
• Add 1 header
• Done

Stop treating CORS like the enemy. Understand it, then it's easy.`,

      `Database connection pooling saved us from a total meltdown last week.

Without pooling: 1000 requests = 1000 connections (server dies)
With pooling: 1000 requests = 10 connections (smooth AF)

If your app talks to a database, you need connection pooling. Non-negotiable.`,

      `SQL injection is NOT dead. Just saw a major brand leak customer data because of it.

Basic rule:
• NEVER concatenate SQL with user input
• ALWAYS use prepared statements
• ALWAYS validate input

This is 2024. There's no excuse for SQL injection vulnerabilities.`,

      `"It works on my machine" is the most honest thing a developer can say, and also the worst.

Just spent 3 days debugging why production failed but local works:
• Different Node versions
• Missing env variables
• Different OS

Docker + docker-compose saves lives. Use them.`,

      `API rate limiting is boring until you need it. 

Then someone's bot hammers your server and everything breaks.

Implement rate limiting early:
• Per IP
• Per user
• Per API key
• Exponential backoff

5 minutes now = no crisis later.`
    ]
  };

  // Get posts for the category
  const categoryPosts = postTemplates[topic.category] || postTemplates['Web Dev Problems'];
  const post = categoryPosts[Math.floor(Math.random() * categoryPosts.length)];

  // Vary hashtags
  const hashtagOptions = [
    `\n\n#${topic.category} #WebDevelopment #Developer`,
    `\n\n#${topic.category} #Coding #DeveloperTips`,
    `\n\n#${topic.category} #Programming #SoftwareDevelopment`,
    `\n\n#${topic.category} #WebDev #CodeTips`,
    `\n\n#${topic.category} #TechTips #Learning`
  ];

  const hashtags = hashtagOptions[Math.floor(Math.random() * hashtagOptions.length)];
  
  return post + hashtags;
}

// Fetch random relevant image from Pexels (no API key needed for basic use)
async function fetchRelevantImage(topic) {
  // Better search terms specific to each category
  const searchTermByCategory = {
    'WordPress': [
      'wordpress development',
      'web design',
      'developer working',
      'code programming',
      'website building',
      'laptop coding'
    ],
    'Laravel': [
      'php development',
      'backend coding',
      'developer workspace',
      'programming laptop',
      'code editor',
      'software development'
    ],
    'Shopify': [
      'ecommerce development',
      'online store',
      'web commerce',
      'shopping platform',
      'digital business',
      'website development'
    ],
    'Web Dev Problems': [
      'debugging code',
      'programmer working',
      'code testing',
      'developer problem solving',
      'laptop coding',
      'tech workspace'
    ]
  };

  const categorySearches = searchTermByCategory[topic.category] || searchTermByCategory['Web Dev Problems'];
  const searchTerm = categorySearches[Math.floor(Math.random() * categorySearches.length)];

  try {
    // Try Pexels API first (no auth needed for basic searches)
    const page = Math.floor(Math.random() * 3) + 1;
    
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query: searchTerm,
        per_page: 15,
        page: page
      },
      headers: {
        'Authorization': 'sGJRmLxCRtTSrVpXN8xVz0qWqH0QvPkqONxYZ9f2b1K4mLd3x5wJ'
      },
      timeout: 10000
    });

    if (response.data.photos && response.data.photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.photos.length);
      const photo = response.data.photos[randomIndex];
      return {
        url: photo.src.large,
        credit: photo.photographer,
        creditUrl: photo.photographer_url
      };
    }
  } catch (error) {
    console.log('Pexels API error, trying fallback images:', error.message);
  }

  // Fallback: Use direct image URLs (no API needed)
  const fallbackImages = [
    { url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' },
    { url: 'https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' },
    { url: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' },
    { url: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' },
    { url: 'https://images.pexels.com/photos/3552505/pexels-photo-3552505.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' },
    { url: 'https://images.pexels.com/photos/3594615/pexels-photo-3594615.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' },
    { url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' },
    { url: 'https://images.pexels.com/photos/3912003/pexels-photo-3912003.jpeg', credit: 'Pexels', creditUrl: 'https://pexels.com' }
  ];

  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
}

// Download and save image
async function downloadImage(imageUrl, filename) {
  try {
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream'
    });

    const filepath = path.join(CONFIG.imagesDir, filename);
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filepath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading image:', error.message);
    return null;
  }
}

// Main function to generate daily post
async function generateDailyPost() {
  try {
    // Ensure directories exist
    if (!fs.existsSync(CONFIG.postsDir)) {
      fs.mkdirSync(CONFIG.postsDir, { recursive: true });
    }
    if (!fs.existsSync(CONFIG.imagesDir)) {
      fs.mkdirSync(CONFIG.imagesDir, { recursive: true });
    }

    // Get random topic
    const topic = getRandomTopic();
    console.log(`📌 Topic: ${topic.category} - ${topic.subtopic}`);

    // Generate post content
    const postContent = await generatePostContent(topic);
    console.log(`✍️ Post generated (${postContent.length} chars)`);

    // Fetch image
    const image = await fetchRelevantImage(topic);
    console.log(`🖼️ Image found: ${image.credit}`);

    // Download image
    const timestamp = new Date().toISOString().split('T')[0];
    const imageFilename = `${timestamp}_${topic.category.replace(/\s+/g, '_')}.jpg`;
    const imagePath = await downloadImage(image.url, imageFilename);

    // Create post JSON
    const postData = {
      date: new Date().toISOString(),
      topic: topic.category,
      subtopic: topic.subtopic,
      content: postContent,
      image: {
        filename: imageFilename,
        localPath: imagePath,
        originalUrl: image.url,
        credit: image.credit,
        creditUrl: image.creditUrl
      },
      linkedInUrl: 'https://www.linkedin.com/feed/' // You'll paste this here after posting
    };

    // Save post JSON
    const jsonFilename = path.join(CONFIG.postsDir, `${timestamp}_post.json`);
    fs.writeFileSync(jsonFilename, JSON.stringify(postData, null, 2));

    // Save as text file for easy viewing
    const textFilename = path.join(CONFIG.postsDir, `${timestamp}_post.txt`);
    const textContent = `📅 ${postData.date}
🏷️ Category: ${postData.topic} - ${postData.subtopic}

📝 POST CONTENT:
${postData.content}

🖼️ IMAGE: ${imagePath}
Credit: ${image.credit} (${image.creditUrl})

✅ Ready to post on LinkedIn!
`;
    fs.writeFileSync(textFilename, textContent);

    console.log(`\n✨ Post ready! Files saved:`);
    console.log(`   - JSON: ${jsonFilename}`);
    console.log(`   - Text: ${textFilename}`);
    console.log(`   - Image: ${imagePath}`);
    console.log(`\n${postData.content}`);

  } catch (error) {
    console.error('❌ Error generating post:', error.message);
  }
}

// Schedule daily post generation
function startScheduler() {
  console.log(`⏰ Scheduler started. Posts will be generated daily at ${CONFIG.scheduleTime}`);
  
  // Run immediately on start
  generateDailyPost();

  // Schedule for daily execution
  cron.schedule(CONFIG.scheduleTime, () => {
    console.log('🔄 Running scheduled post generation...');
    generateDailyPost();
  });
}

// Run immediately if called directly
if (require.main === module) {
  console.log('🚀 LinkedIn Post Automation Script');
  console.log('==================================\n');

  const args = process.argv.slice(2);
  if (args.includes('--once')) {
    generateDailyPost();
  } else {
    startScheduler();
  }
}

module.exports = { generateDailyPost, startScheduler };
