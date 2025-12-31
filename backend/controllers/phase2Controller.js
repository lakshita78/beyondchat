// backend/controllers/phase2Controller.js

const axios = require("axios");
const Article = require("../models/articleModel");
const OpenAI = require("openai");

// Setup OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper: simulate Google search scraping (replace with Puppeteer if needed)
const getTopArticleLinks = async (title) => {
  // Simulated top 2 links
  return [
    "https://example.com/article1",
    "https://example.com/article2",
  ];
};

// Helper: fetch main content from URLs (replace with real scraper)
const scrapeContent = async (url) => {
  // Simulate content fetch
  return `Content from ${url}`;
};

// Controller function
const updateArticles = async (req, res) => {
  try {
    // Fetch all articles from DB
    const articles = await Article.find();

    for (let article of articles) {
      // 1️⃣ Get top 2 Google links for article title
      const topLinks = await getTopArticleLinks(article.title);

      // 2️⃣ Scrape main content from each link
      const scrapedContents = [];
      for (let link of topLinks) {
        const content = await scrapeContent(link);
        scrapedContents.push(content);
      }

      // 3️⃣ Use OpenAI to rewrite/update article content
      const prompt = `
        Update the following article to make it similar in style and content to these references:
        References: ${scrapedContents.join("\n\n")}
        Original article: ${article.content}
        Make sure to keep references at the bottom.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
      });

      const updatedContent = response.choices[0].message.content;

      // 4️⃣ Save updated article
      article.content = updatedContent;
      article.references = topLinks; // save the reference URLs
      await article.save();
    }

    res.status(200).json({ message: "Articles updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating articles", error: error.message });
  }
};

module.exports = { updateArticles };
